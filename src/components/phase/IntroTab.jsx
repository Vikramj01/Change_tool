import { Lightbulb, Target, Users, ListChecks } from 'lucide-react';
import { useToolkit } from '../../context/ToolkitContext';
import CollapsibleCard from '../shared/CollapsibleCard';
import RAGBadge from '../shared/RAGBadge';
import ProgressRing from '../shared/ProgressRing';

export default function IntroTab({ phase, phaseId }) {
  const { state, dispatch, getPhaseChecklistCompletion } = useToolkit();
  const engagement = state.stakeholderEngagement[phaseId] || {};
  const completion = getPhaseChecklistCompletion(phaseId);

  function toggleEngagement(idx) {
    dispatch({ type: 'TOGGLE_STAKEHOLDER_ENGAGEMENT', payload: { phaseId, stakeholderIdx: idx } });
  }

  return (
    <div className="p-6 space-y-4 max-w-4xl">
      {/* Brief */}
      <CollapsibleCard
        title="Brief"
        defaultOpen={true}
        accent={phase.color}
      >
        <div className="p-4">
          <p className="text-sm text-gray-700 leading-relaxed">{phase.brief}</p>
        </div>
      </CollapsibleCard>

      {/* Objectives */}
      <CollapsibleCard
        title="Objectives"
        defaultOpen={true}
        icon={<Target className="w-4 h-4" />}
      >
        <div className="p-4">
          <ul className="space-y-2">
            {phase.objectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: phase.color }}
                >
                  {idx + 1}
                </div>
                {obj}
              </li>
            ))}
          </ul>
        </div>
      </CollapsibleCard>

      {/* Tips & Tricks */}
      <CollapsibleCard
        title="Tips & Tricks"
        defaultOpen={false}
        icon={<Lightbulb className="w-4 h-4" />}
      >
        <div className="p-4 space-y-2">
          {phase.tips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
              <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900">{tip}</p>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      {/* Stakeholders to Engage */}
      <CollapsibleCard
        title="Stakeholders to Engage"
        defaultOpen={false}
        icon={<Users className="w-4 h-4" />}
      >
        <div className="p-4 space-y-2">
          {phase.stakeholders.map((sh, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{sh.role}</p>
                <p className="text-xs text-gray-600 mt-0.5">{sh.involvement}</p>
              </div>
              <button
                onClick={() => toggleEngagement(idx)}
                className={`flex-shrink-0 text-xs font-medium px-2 py-1 rounded-full border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                  engagement[idx]
                    ? 'bg-green-100 text-green-800 border-green-300'
                    : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                }`}
                aria-pressed={!!engagement[idx]}
              >
                {engagement[idx] ? 'Engaged' : 'Not Yet Engaged'}
              </button>
            </div>
          ))}
        </div>
      </CollapsibleCard>

      {/* Checklist Preview */}
      <CollapsibleCard
        title="Checklist Preview"
        defaultOpen={false}
        icon={<ListChecks className="w-4 h-4" />}
        headerRight={
          <div className="flex items-center gap-2">
            <RAGBadge status={completion.rag} size="sm" />
            <ProgressRing pct={completion.pct} size={24} strokeWidth={3} color="auto" label={false} />
          </div>
        }
      >
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <ProgressRing pct={completion.pct} size={40} strokeWidth={4} color="auto" />
            <div>
              <p className="text-sm font-medium text-gray-900">{completion.completed} of {completion.total} items complete</p>
              <RAGBadge status={completion.rag} size="sm" />
            </div>
          </div>
          <ul className="space-y-1.5">
            {phase.checklist.slice(0, 3).map((item, idx) => {
              const itemState = state.checklists[phaseId]?.[item.id];
              return (
                <li key={item.id} className="flex items-center gap-2 text-xs text-gray-600">
                  <div className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${
                    itemState?.complete ? 'bg-green-500 border-green-500' : 'border-gray-300'
                  }`}>
                    {itemState?.complete && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                        <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className={itemState?.complete ? 'line-through text-gray-400' : ''}>{item.text}</span>
                </li>
              );
            })}
            {phase.checklist.length > 3 && (
              <li className="text-xs text-gray-400 pl-6">
                +{phase.checklist.length - 3} more items in the Checklist tab
              </li>
            )}
          </ul>
        </div>
      </CollapsibleCard>
    </div>
  );
}
