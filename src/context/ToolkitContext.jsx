import { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import {
  loadFromStorage,
  saveToStorage,
  STORAGE_KEYS,
} from '../utils/storageHelpers';
import {
  DEFAULT_CONFIG,
  DEFAULT_STAKEHOLDERS,
  DEFAULT_COMMS_PLAN,
  DEFAULT_IMPACT_MATRIX,
  DEFAULT_ADOPTION,
  DEFAULT_CHAMPIONS,
} from '../data/defaults';
import { PHASES } from '../data/phases';
import { calculateRAG } from '../utils/ragCalculator';
import { nowISO } from '../utils/dateHelpers';

// ─── Initial State ────────────────────────────────────────────────────────────

function buildInitialChecklists() {
  const checklists = {};
  PHASES.forEach(phase => {
    checklists[phase.id] = {};
    phase.checklist.forEach(item => {
      checklists[phase.id][item.id] = {
        complete: false,
        owner: '',
        dueDate: null,
        notes: '',
        updatedAt: null,
      };
    });
  });
  return checklists;
}

function buildInitialPhases() {
  const phases = {};
  PHASES.forEach(phase => {
    phases[phase.id] = {
      status: 'not_started',
      signedOffAt: null,
      signedOffBy: null,
      lastUpdatedAt: null,
    };
  });
  return phases;
}

function buildInitialSteps() {
  const steps = {};
  PHASES.forEach(phase => {
    steps[phase.id] = {};
    (phase.steps || []).forEach(step => {
      steps[phase.id][step.id] = {
        status: 'not_started',
        notes: '',
        updatedAt: null,
      };
    });
  });
  return steps;
}

function buildInitialStakeholderEngagement() {
  const engagement = {};
  PHASES.forEach(phase => {
    engagement[phase.id] = {};
    (phase.stakeholders || []).forEach((_, idx) => {
      engagement[phase.id][idx] = false; // false = "Not Yet Engaged"
    });
  });
  return engagement;
}

const initialState = {
  setupComplete: loadFromStorage(STORAGE_KEYS.setupComplete) ?? false,
  config: loadFromStorage(STORAGE_KEYS.config) ?? DEFAULT_CONFIG,
  phases: loadFromStorage(STORAGE_KEYS.phases) ?? buildInitialPhases(),
  checklists: loadFromStorage(STORAGE_KEYS.checklists) ?? buildInitialChecklists(),
  steps: loadFromStorage(STORAGE_KEYS.steps) ?? buildInitialSteps(),
  stakeholders: loadFromStorage(STORAGE_KEYS.stakeholders) ?? DEFAULT_STAKEHOLDERS,
  commsPlan: loadFromStorage(STORAGE_KEYS.commsPlan) ?? DEFAULT_COMMS_PLAN,
  impactMatrix: loadFromStorage(STORAGE_KEYS.impactMatrix) ?? DEFAULT_IMPACT_MATRIX,
  adoption: loadFromStorage(STORAGE_KEYS.adoption) ?? DEFAULT_ADOPTION,
  champions: loadFromStorage(STORAGE_KEYS.champions) ?? DEFAULT_CHAMPIONS,
  stakeholderEngagement: loadFromStorage(STORAGE_KEYS.stakeholderEngagement) ?? buildInitialStakeholderEngagement(),
  readinessAssessment: loadFromStorage(STORAGE_KEYS.readinessAssessment) ?? null,
  readinessPulse: loadFromStorage(STORAGE_KEYS.readinessPulse) ?? null,
  activityFeed: loadFromStorage(STORAGE_KEYS.activityFeed) ?? [],
  savedIndicator: false, // transient — not persisted
};

// ─── Reducer ──────────────────────────────────────────────────────────────────

function toolkitReducer(state, action) {
  switch (action.type) {

    case 'COMPLETE_SETUP': {
      return {
        ...state,
        setupComplete: true,
        config: { ...state.config, ...action.payload },
      };
    }

    case 'UPDATE_CONFIG': {
      return {
        ...state,
        config: { ...state.config, ...action.payload },
      };
    }

    case 'TOGGLE_CHECKLIST_ITEM': {
      const { phaseId, itemId } = action.payload;
      const updated = {
        ...state.checklists,
        [phaseId]: {
          ...state.checklists[phaseId],
          [itemId]: {
            ...state.checklists[phaseId][itemId],
            complete: !state.checklists[phaseId][itemId].complete,
            updatedAt: nowISO(),
          },
        },
      };
      // Derive phase status from checklist completion
      const phase = PHASES.find(p => p.id === phaseId);
      const totalItems = phase ? phase.checklist.length : 0;
      const completedCount = Object.values(updated[phaseId]).filter(i => i.complete).length;
      const rag = calculateRAG(completedCount, totalItems);
      const phaseStatus = completedCount === 0 ? 'not_started'
        : completedCount === totalItems ? 'in_progress'
        : 'in_progress';

      const feed = addFeedItem(state.activityFeed, {
        message: `Checklist item ${action.payload.complete ? 'unchecked' : 'checked'} in ${phase?.name || phaseId}`,
        phaseId,
        type: 'checklist',
      });

      return {
        ...state,
        checklists: updated,
        phases: {
          ...state.phases,
          [phaseId]: {
            ...state.phases[phaseId],
            status: phaseStatus,
            lastUpdatedAt: nowISO(),
            rag,
          },
        },
        activityFeed: feed,
      };
    }

    case 'UPDATE_CHECKLIST_ITEM': {
      const { phaseId, itemId, field, value } = action.payload;
      return {
        ...state,
        checklists: {
          ...state.checklists,
          [phaseId]: {
            ...state.checklists[phaseId],
            [itemId]: {
              ...state.checklists[phaseId][itemId],
              [field]: value,
              updatedAt: nowISO(),
            },
          },
        },
      };
    }

    case 'SIGN_OFF_PHASE': {
      const { phaseId, signedOffBy } = action.payload;
      const feed = addFeedItem(state.activityFeed, {
        message: `Phase signed off: ${PHASES.find(p => p.id === phaseId)?.name || phaseId}`,
        phaseId,
        type: 'signoff',
      });
      return {
        ...state,
        phases: {
          ...state.phases,
          [phaseId]: {
            ...state.phases[phaseId],
            status: 'complete',
            signedOffAt: nowISO(),
            signedOffBy,
            lastUpdatedAt: nowISO(),
          },
        },
        activityFeed: feed,
      };
    }

    case 'UPDATE_STEP': {
      const { phaseId, stepId, field, value } = action.payload;
      const feed = field === 'status'
        ? addFeedItem(state.activityFeed, {
            message: `Step updated to "${value}" in ${PHASES.find(p => p.id === phaseId)?.name || phaseId}`,
            phaseId,
            type: 'step',
          })
        : state.activityFeed;
      return {
        ...state,
        steps: {
          ...state.steps,
          [phaseId]: {
            ...state.steps[phaseId],
            [stepId]: {
              ...state.steps[phaseId]?.[stepId],
              [field]: value,
              updatedAt: nowISO(),
            },
          },
        },
        phases: {
          ...state.phases,
          [phaseId]: {
            ...state.phases[phaseId],
            lastUpdatedAt: nowISO(),
          },
        },
        activityFeed: feed,
      };
    }

    // ── Stakeholders ──────────────────────────────────────────────────────────

    case 'ADD_STAKEHOLDER': {
      const feed = addFeedItem(state.activityFeed, {
        message: `Stakeholder added: ${action.payload.name}`,
        phaseId: 'phase2',
        type: 'stakeholder',
      });
      return {
        ...state,
        stakeholders: [...state.stakeholders, action.payload],
        activityFeed: feed,
      };
    }

    case 'UPDATE_STAKEHOLDER': {
      return {
        ...state,
        stakeholders: state.stakeholders.map(s =>
          s.id === action.payload.id ? { ...s, ...action.payload } : s
        ),
      };
    }

    case 'REMOVE_STAKEHOLDER': {
      return {
        ...state,
        stakeholders: state.stakeholders.filter(s => s.id !== action.payload),
      };
    }

    case 'TOGGLE_STAKEHOLDER_ENGAGEMENT': {
      const { phaseId, stakeholderIdx } = action.payload;
      return {
        ...state,
        stakeholderEngagement: {
          ...state.stakeholderEngagement,
          [phaseId]: {
            ...state.stakeholderEngagement[phaseId],
            [stakeholderIdx]: !state.stakeholderEngagement[phaseId]?.[stakeholderIdx],
          },
        },
      };
    }

    // ── Comms Plan ────────────────────────────────────────────────────────────

    case 'ADD_COMMS_ITEM': {
      const feed = addFeedItem(state.activityFeed, {
        message: `Comms plan item added: ${action.payload.title}`,
        phaseId: 'phase2',
        type: 'comms',
      });
      return {
        ...state,
        commsPlan: [...state.commsPlan, action.payload],
        activityFeed: feed,
      };
    }

    case 'UPDATE_COMMS_ITEM': {
      return {
        ...state,
        commsPlan: state.commsPlan.map(item =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        ),
      };
    }

    case 'REMOVE_COMMS_ITEM': {
      return {
        ...state,
        commsPlan: state.commsPlan.filter(item => item.id !== action.payload),
      };
    }

    // ── Impact Matrix ─────────────────────────────────────────────────────────

    case 'ADD_IMPACT_ITEM': {
      return { ...state, impactMatrix: [...state.impactMatrix, action.payload] };
    }

    case 'UPDATE_IMPACT_ITEM': {
      return {
        ...state,
        impactMatrix: state.impactMatrix.map(item =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        ),
      };
    }

    case 'REMOVE_IMPACT_ITEM': {
      return {
        ...state,
        impactMatrix: state.impactMatrix.filter(item => item.id !== action.payload),
      };
    }

    // ── Adoption ──────────────────────────────────────────────────────────────

    case 'UPDATE_ADOPTION': {
      return { ...state, adoption: { ...state.adoption, ...action.payload } };
    }

    case 'ADD_WAVE': {
      return {
        ...state,
        adoption: { ...state.adoption, waves: [...state.adoption.waves, action.payload] },
      };
    }

    case 'UPDATE_WAVE': {
      return {
        ...state,
        adoption: {
          ...state.adoption,
          waves: state.adoption.waves.map(w =>
            w.id === action.payload.id ? { ...w, ...action.payload } : w
          ),
        },
      };
    }

    case 'REMOVE_WAVE': {
      return {
        ...state,
        adoption: {
          ...state.adoption,
          waves: state.adoption.waves.filter(w => w.id !== action.payload),
        },
      };
    }

    case 'ADD_WEEKLY_DATA': {
      return {
        ...state,
        adoption: {
          ...state.adoption,
          weeklyData: [...state.adoption.weeklyData, action.payload],
        },
      };
    }

    case 'UPDATE_ADOPTION_TARGETS': {
      return {
        ...state,
        adoption: { ...state.adoption, targets: { ...state.adoption.targets, ...action.payload } },
      };
    }

    // ── Champions ─────────────────────────────────────────────────────────────

    case 'ADD_CHAMPION': {
      const feed = addFeedItem(state.activityFeed, {
        message: `Champion added: ${action.payload.name}`,
        phaseId: 'phase5',
        type: 'champion',
      });
      return {
        ...state,
        champions: [...state.champions, action.payload],
        activityFeed: feed,
      };
    }

    case 'UPDATE_CHAMPION': {
      return {
        ...state,
        champions: state.champions.map(c =>
          c.id === action.payload.id ? { ...c, ...action.payload } : c
        ),
      };
    }

    case 'REMOVE_CHAMPION': {
      return {
        ...state,
        champions: state.champions.filter(c => c.id !== action.payload),
      };
    }

    // ── Readiness ─────────────────────────────────────────────────────────────

    case 'UPDATE_READINESS_ASSESSMENT': {
      return { ...state, readinessAssessment: action.payload };
    }

    case 'UPDATE_READINESS_PULSE': {
      return { ...state, readinessPulse: action.payload };
    }

    // ── UI ────────────────────────────────────────────────────────────────────

    case 'SHOW_SAVED': {
      return { ...state, savedIndicator: true };
    }

    case 'HIDE_SAVED': {
      return { ...state, savedIndicator: false };
    }

    case 'IMPORT_DATA': {
      return { ...action.payload, savedIndicator: false };
    }

    case 'RESET_ALL': {
      return { ...initialState, setupComplete: false, savedIndicator: false };
    }

    default:
      return state;
  }
}

// ─── Activity Feed Helper ─────────────────────────────────────────────────────

function addFeedItem(feed, { message, phaseId, type }) {
  const item = {
    id: `feed_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    message,
    phaseId,
    type,
    timestamp: nowISO(),
  };
  return [item, ...feed].slice(0, 50); // Keep last 50 items
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ToolkitContext = createContext(null);

// ─── Derived selectors (memoised in context) ──────────────────────────────────

function derivePhaseHealth(state) {
  return PHASES.map(phase => {
    const checklistData = state.checklists[phase.id] || {};
    const items = phase.checklist || [];
    const totalItems = items.length;
    const completedItems = items.filter(item => checklistData[item.id]?.complete).length;
    const rag = calculateRAG(completedItems, totalItems);
    const phaseMeta = state.phases[phase.id] || {};
    return {
      phaseId: phase.id,
      phaseName: phase.name,
      phaseNumber: phase.number,
      color: phase.color,
      totalItems,
      completedItems,
      rag,
      status: phaseMeta.status || 'not_started',
      signedOffAt: phaseMeta.signedOffAt,
      signedOffBy: phaseMeta.signedOffBy,
      lastUpdatedAt: phaseMeta.lastUpdatedAt,
      owner: state.config.phaseOwners?.[phase.id] || '',
    };
  });
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ToolkitProvider({ children }) {
  const [state, dispatch] = useReducer(toolkitReducer, initialState);
  const saveTimerRef = useRef(null);
  const savedTimerRef = useRef(null);

  // Debounced persistence to localStorage
  useEffect(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveToStorage(STORAGE_KEYS.setupComplete, state.setupComplete);
      saveToStorage(STORAGE_KEYS.config, state.config);
      saveToStorage(STORAGE_KEYS.phases, state.phases);
      saveToStorage(STORAGE_KEYS.checklists, state.checklists);
      saveToStorage(STORAGE_KEYS.steps, state.steps);
      saveToStorage(STORAGE_KEYS.stakeholders, state.stakeholders);
      saveToStorage(STORAGE_KEYS.commsPlan, state.commsPlan);
      saveToStorage(STORAGE_KEYS.impactMatrix, state.impactMatrix);
      saveToStorage(STORAGE_KEYS.adoption, state.adoption);
      saveToStorage(STORAGE_KEYS.champions, state.champions);
      saveToStorage(STORAGE_KEYS.stakeholderEngagement, state.stakeholderEngagement);
      saveToStorage(STORAGE_KEYS.readinessAssessment, state.readinessAssessment);
      saveToStorage(STORAGE_KEYS.readinessPulse, state.readinessPulse);
      saveToStorage(STORAGE_KEYS.activityFeed, state.activityFeed);

      // Show "Saved" indicator
      dispatch({ type: 'SHOW_SAVED' });
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
      savedTimerRef.current = setTimeout(() => {
        dispatch({ type: 'HIDE_SAVED' });
      }, 2000);
    }, 500);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [
    state.setupComplete,
    state.config,
    state.phases,
    state.checklists,
    state.steps,
    state.stakeholders,
    state.commsPlan,
    state.impactMatrix,
    state.adoption,
    state.champions,
    state.stakeholderEngagement,
    state.readinessAssessment,
    state.readinessPulse,
    state.activityFeed,
  ]);

  const phaseHealth = derivePhaseHealth(state);

  const getPhaseChecklistCompletion = useCallback((phaseId) => {
    const phase = PHASES.find(p => p.id === phaseId);
    if (!phase) return { completed: 0, total: 0, pct: 0, rag: 'red' };
    const items = phase.checklist;
    const total = items.length;
    const completed = items.filter(item => state.checklists[phaseId]?.[item.id]?.complete).length;
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
    const rag = calculateRAG(completed, total);
    return { completed, total, pct, rag };
  }, [state.checklists]);

  const getTotalCompletion = useCallback(() => {
    const total = PHASES.reduce((sum, p) => sum + p.checklist.length, 0);
    const completed = PHASES.reduce((sum, phase) => {
      return sum + phase.checklist.filter(item => state.checklists[phase.id]?.[item.id]?.complete).length;
    }, 0);
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { completed, total, pct };
  }, [state.checklists]);

  const value = {
    state,
    dispatch,
    phaseHealth,
    getPhaseChecklistCompletion,
    getTotalCompletion,
  };

  return (
    <ToolkitContext.Provider value={value}>
      {children}
    </ToolkitContext.Provider>
  );
}

export function useToolkit() {
  const context = useContext(ToolkitContext);
  if (!context) {
    throw new Error('useToolkit must be used within a ToolkitProvider');
  }
  return context;
}
