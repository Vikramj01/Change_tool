const PREFIX = 'toolkit_';

export const STORAGE_KEYS = {
  config: `${PREFIX}config`,
  phases: `${PREFIX}phases`,
  checklists: `${PREFIX}checklists`,
  steps: `${PREFIX}steps`,
  stakeholders: `${PREFIX}stakeholders`,
  commsPlan: `${PREFIX}comms_plan`,
  impactMatrix: `${PREFIX}impact_matrix`,
  adoption: `${PREFIX}adoption`,
  champions: `${PREFIX}champions`,
  lastPage: `${PREFIX}lastPage`,
  activityFeed: `${PREFIX}activity_feed`,
  stakeholderEngagement: `${PREFIX}stakeholder_engagement`,
  readinessAssessment: `${PREFIX}readiness_assessment`,
  readinessPulse: `${PREFIX}readiness_pulse`,
  setupComplete: `${PREFIX}setup_complete`,
};

export function loadFromStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage might be full — fail silently
  }
}

export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export function exportAllData() {
  const data = {};
  Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
    const value = loadFromStorage(key);
    if (value !== null) {
      data[name] = value;
    }
  });
  return data;
}

export function importAllData(data) {
  const keyMap = Object.fromEntries(
    Object.entries(STORAGE_KEYS).map(([name, key]) => [name, key])
  );
  Object.entries(data).forEach(([name, value]) => {
    if (keyMap[name]) {
      saveToStorage(keyMap[name], value);
    }
  });
}

export function clearAllData() {
  Object.values(STORAGE_KEYS).forEach(key => {
    removeFromStorage(key);
  });
}
