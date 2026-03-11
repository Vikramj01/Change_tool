import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, ListChecks, Wrench } from 'lucide-react';
import { PHASES } from '../../data/phases';
import { useToolkit } from '../../context/ToolkitContext';
import IntroTab from './IntroTab';
import ChecklistTab from './ChecklistTab';
import StepsTab from './StepsTab';
import RAGBadge from '../shared/RAGBadge';
import ProgressRing from '../shared/ProgressRing';

const TABS = [
  { id: 'intro', label: 'Introduction', icon: Info },
  { id: 'steps', label: 'Steps & Tools', icon: Wrench },
  { id: 'checklist', label: 'Checklist', icon: ListChecks },
];

export default function PhaseDetail() {
  const { phaseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('intro');
  const { phaseHealth, getPhaseChecklistCompletion } = useToolkit();

  const phase = PHASES.find(p => p.id === phaseId);
  const health = phaseHealth.find(p => p.phaseId === phaseId);
  const completion = getPhaseChecklistCompletion(phaseId);

  if (!phase) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Phase not found.</p>
        <button onClick={() => navigate('/dashboard')} className="mt-4 text-sm text-red-600 underline">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Phase header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 mb-3 transition-colors focus:outline-none"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Back
        </button>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ backgroundColor: phase.color }}
            >
              {phase.number}
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-gray-900 truncate">
                Phase {phase.number}: {phase.name}
              </h2>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <RAGBadge status={completion.rag} size="sm" />
                {health?.signedOffAt && (
                  <span className="text-xs text-green-600 font-medium">✓ Signed off</span>
                )}
                {health?.owner && (
                  <span className="text-xs text-gray-500">Owner: {health.owner}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <ProgressRing pct={completion.pct} size={48} strokeWidth={4} color="auto" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-4" role="tablist">
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                  activeTab === tab.id
                    ? 'bg-red-50 text-red-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'intro' && <IntroTab phase={phase} phaseId={phaseId} />}
        {activeTab === 'steps' && <StepsTab phase={phase} phaseId={phaseId} />}
        {activeTab === 'checklist' && <ChecklistTab phase={phase} phaseId={phaseId} onSwitchTab={setActiveTab} />}
      </div>
    </div>
  );
}
