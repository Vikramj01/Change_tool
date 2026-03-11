import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  TrendingUp,
  Users,
  CheckSquare,
  AlertCircle,
  Clock,
  FileDown,
} from 'lucide-react';
import { useToolkit } from '../../context/ToolkitContext';
import { PHASES } from '../../data/phases';
import RAGBadge from '../shared/RAGBadge';
import ProgressRing from '../shared/ProgressRing';
import { timeAgo } from '../../utils/dateHelpers';

export default function Dashboard() {
  const { state, phaseHealth, getTotalCompletion } = useToolkit();
  const navigate = useNavigate();
  const { config } = state;
  const total = getTotalCompletion();

  // Find lowest completion phase (for "Continue where I left off")
  const lowestPhase = [...phaseHealth]
    .filter(p => p.status !== 'complete')
    .sort((a, b) => (a.completedItems / Math.max(a.totalItems, 1)) - (b.completedItems / Math.max(b.totalItems, 1)))[0];

  // Recent activity
  const recentActivity = state.activityFeed.slice(0, 8);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{config.programName}</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {config.sponsor && `Executive Sponsor: ${config.sponsor}`}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {lowestPhase && (
            <button
              onClick={() => navigate(`/phase/${lowestPhase.phaseId}`)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#CC0000] rounded-lg hover:bg-[#b00000] transition-colors"
            >
              Continue where I left off
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={() => navigate('/wheel')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View Change Wheel
          </button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          icon={<CheckSquare className="w-4 h-4 text-green-600" />}
          label="Overall Completion"
          value={`${total.pct}%`}
          sub={`${total.completed} / ${total.total} items`}
          color="green"
        />
        <StatCard
          icon={<TrendingUp className="w-4 h-4 text-blue-600" />}
          label="Phases Complete"
          value={`${phaseHealth.filter(p => p.status === 'complete').length} / 8`}
          sub="Signed off"
          color="blue"
        />
        <StatCard
          icon={<Users className="w-4 h-4 text-purple-600" />}
          label="Champions"
          value={state.champions.filter(c => c.status === 'active').length}
          sub={`of ${state.champions.length} total`}
          color="purple"
        />
        <StatCard
          icon={<AlertCircle className="w-4 h-4 text-amber-600" />}
          label="Phases At Risk"
          value={phaseHealth.filter(p => p.rag === 'red').length}
          sub="Red status"
          color="amber"
        />
      </div>

      {/* Phase health grid */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Phase Health Scorecard</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {phaseHealth.map(phase => (
            <PhaseCard
              key={phase.phaseId}
              phase={phase}
              onClick={() => navigate(`/phase/${phase.phaseId}`)}
            />
          ))}
        </div>
      </div>

      {/* Bottom row: activity feed + sprint info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity feed */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
            {recentActivity.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-gray-400">
                No activity yet — start working through the phases to see updates here.
              </div>
            ) : (
              <ul className="divide-y divide-gray-50">
                {recentActivity.map(item => (
                  <li key={item.id} className="px-4 py-3 flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-700">{item.message}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{timeAgo(item.timestamp)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Sprint info */}
        <div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900">Sprint Overview</h3>
            </div>
            <div className="p-4 space-y-3">
              {config.sprints?.map(sprint => (
                <div
                  key={sprint.id}
                  className={`p-3 rounded-lg text-xs ${
                    config.activeSprint === sprint.id
                      ? 'bg-red-50 border border-red-200'
                      : 'bg-gray-50 border border-transparent'
                  }`}
                >
                  <p className={`font-medium ${config.activeSprint === sprint.id ? 'text-red-800' : 'text-gray-700'}`}>
                    {sprint.name}
                  </p>
                  {sprint.start && (
                    <p className="text-gray-400 mt-0.5">
                      {sprint.start} → {sprint.end || 'TBD'}
                    </p>
                  )}
                  {config.activeSprint === sprint.id && (
                    <span className="inline-block mt-1 px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium">
                      Active
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub, color }) {
  const colorMap = {
    green: 'bg-green-50 border-green-100',
    blue: 'bg-blue-50 border-blue-100',
    purple: 'bg-purple-50 border-purple-100',
    amber: 'bg-amber-50 border-amber-100',
  };
  return (
    <div className={`rounded-xl border p-4 ${colorMap[color] || 'bg-gray-50 border-gray-100'}`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs text-gray-500 font-medium">{label}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
    </div>
  );
}

function PhaseCard({ phase, onClick }) {
  const pct = phase.totalItems === 0 ? 0 : Math.round((phase.completedItems / phase.totalItems) * 100);

  return (
    <button
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-gray-300 hover:shadow-sm transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ backgroundColor: phase.color }}
        >
          {phase.phaseNumber}
        </div>
        <RAGBadge status={phase.rag} size="sm" />
      </div>
      <p className="text-sm font-semibold text-gray-900 mb-1 leading-tight group-hover:text-[#CC0000] transition-colors">
        {phase.phaseName}
      </p>
      {phase.owner && (
        <p className="text-xs text-gray-400 mb-2 truncate">{phase.owner}</p>
      )}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {phase.completedItems}/{phase.totalItems} items
        </span>
        <ProgressRing pct={pct} size={32} strokeWidth={3} color="auto" />
      </div>
      {phase.lastUpdatedAt && (
        <p className="text-xs text-gray-400 mt-2">{timeAgo(phase.lastUpdatedAt)}</p>
      )}
    </button>
  );
}
