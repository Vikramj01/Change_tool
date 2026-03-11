import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useToolkit } from '../../context/ToolkitContext';
import ProgressRing from '../shared/ProgressRing';
import RAGBadge from '../shared/RAGBadge';
import ConfirmModal from '../shared/ConfirmModal';
import { isoToDateInput } from '../../utils/dateHelpers';

export default function ChecklistTab({ phase, phaseId, onSwitchTab }) {
  const { state, dispatch, getPhaseChecklistCompletion } = useToolkit();
  const [signOffModal, setSignOffModal] = useState(false);
  const [signOffName, setSignOffName] = useState('');
  const completion = getPhaseChecklistCompletion(phaseId);
  const phaseState = state.phases[phaseId] || {};

  function toggle(itemId) {
    dispatch({ type: 'TOGGLE_CHECKLIST_ITEM', payload: { phaseId, itemId } });
  }

  function updateItem(itemId, field, value) {
    dispatch({ type: 'UPDATE_CHECKLIST_ITEM', payload: { phaseId, itemId, field, value } });
  }

  function handleSignOff() {
    dispatch({ type: 'SIGN_OFF_PHASE', payload: { phaseId, signedOffBy: signOffName || 'Change Lead' } });
    setSignOffModal(false);
  }

  return (
    <div className="p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <ProgressRing pct={completion.pct} size={56} strokeWidth={5} color="auto" />
          <div>
            <h3 className="text-base font-semibold text-gray-900">Phase Checklist</h3>
            <p className="text-sm text-gray-500">{completion.completed} of {completion.total} items complete</p>
            <RAGBadge status={completion.rag} size="sm" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {phaseState.signedOffAt ? (
            <div className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
              <CheckCircle2 className="w-4 h-4" />
              Signed off by {phaseState.signedOffBy}
            </div>
          ) : (
            <button
              onClick={() => setSignOffModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-[#CC0000] rounded-lg hover:bg-[#b00000] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              <CheckCircle2 className="w-4 h-4" />
              Sign Off Phase
            </button>
          )}
        </div>
      </div>

      {/* Checklist items */}
      <div className="space-y-2">
        {phase.checklist.map(item => {
          const itemState = state.checklists[phaseId]?.[item.id] || {};
          const isComplete = itemState.complete;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-xl border transition-colors ${
                isComplete ? 'border-green-200 bg-green-50/30' : 'border-gray-200'
              }`}
            >
              {/* Main row */}
              <div className="flex items-start gap-3 p-4">
                <button
                  onClick={() => toggle(item.id)}
                  className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                    isComplete
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300 hover:border-green-400'
                  }`}
                  aria-label={isComplete ? `Uncheck: ${item.text}` : `Check: ${item.text}`}
                  aria-checked={isComplete}
                  role="checkbox"
                >
                  {isComplete && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${isComplete ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {item.text}
                  </p>
                  {/* Metadata row */}
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <input
                      type="text"
                      value={itemState.owner || ''}
                      onChange={e => updateItem(item.id, 'owner', e.target.value)}
                      placeholder="Owner"
                      className="text-xs border border-gray-200 rounded px-2 py-1 w-28 focus:outline-none focus:ring-1 focus:ring-red-400"
                    />
                    <input
                      type="date"
                      value={isoToDateInput(itemState.dueDate)}
                      onChange={e => updateItem(item.id, 'dueDate', e.target.value || null)}
                      className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-400"
                    />
                    <input
                      type="text"
                      value={itemState.notes || ''}
                      onChange={e => updateItem(item.id, 'notes', e.target.value)}
                      placeholder="Notes..."
                      className="text-xs border border-gray-200 rounded px-2 py-1 flex-1 min-w-[120px] focus:outline-none focus:ring-1 focus:ring-red-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sign-off modal */}
      <ConfirmModal
        open={signOffModal}
        title="Sign Off This Phase"
        message={
          <div className="space-y-3">
            <p>This will mark Phase {phase.number}: {phase.name} as complete. Please confirm the sign-off name.</p>
            <input
              type="text"
              value={signOffName}
              onChange={e => setSignOffName(e.target.value)}
              placeholder="Your name"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        }
        confirmLabel="Sign Off"
        onConfirm={handleSignOff}
        onCancel={() => setSignOffModal(false)}
      />
    </div>
  );
}
