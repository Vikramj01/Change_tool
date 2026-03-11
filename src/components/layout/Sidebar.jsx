import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CircleDot,
  BarChart3,
  Users,
  Settings,
  ChevronRight,
} from 'lucide-react';
import { PHASES } from '../../data/phases';
import { useToolkit } from '../../context/ToolkitContext';
import RAGBadge from '../shared/RAGBadge';

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/wheel', icon: CircleDot, label: 'Change Wheel' },
  { to: '/adoption', icon: BarChart3, label: 'Adoption Metrics' },
  { to: '/champions', icon: Users, label: 'Champions' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ onClose }) {
  const { phaseHealth } = useToolkit();

  return (
    <aside className="flex flex-col h-full bg-[#1A1A2E] text-white w-64 flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-[#CC0000] flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">A</span>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-white truncate">ABSA Change Toolkit</p>
          <p className="text-xs text-white/50 truncate">Workday Adoption</p>
        </div>
      </div>

      {/* Main nav */}
      <nav className="px-2 py-3 flex-shrink-0" aria-label="Main navigation">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors mb-0.5 ${
                isActive
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Phase list */}
      <div className="px-2 py-2 flex-1 overflow-y-auto min-h-0">
        <p className="text-xs font-semibold text-white/40 uppercase tracking-wider px-3 mb-2">
          Phases
        </p>
        {phaseHealth.map(phase => (
          <NavLink
            key={phase.phaseId}
            to={`/phase/${phase.phaseId}`}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors mb-0.5 group ${
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: phase.color }}
            />
            <span className="flex-1 truncate">
              {phase.phaseNumber}. {phase.phaseName}
            </span>
            <RAGBadge status={phase.rag} size="sm" showDot={false} />
          </NavLink>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/10 flex-shrink-0">
        <p className="text-xs text-white/30">v1.0 — MVP</p>
      </div>
    </aside>
  );
}
