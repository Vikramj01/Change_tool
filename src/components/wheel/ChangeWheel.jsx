import { useNavigate } from 'react-router-dom';
import { useToolkit } from '../../context/ToolkitContext';
import { PHASES } from '../../data/phases';
import RAGBadge from '../shared/RAGBadge';
import ProgressRing from '../shared/ProgressRing';
import { useState } from 'react';
import { List, Circle } from 'lucide-react';

// SVG octagonal wheel — 8 equal segments
// Each segment is a pie slice at 45° intervals
const WHEEL_SIZE = 480;
const CX = WHEEL_SIZE / 2;
const CY = WHEEL_SIZE / 2;
const OUTER_R = 210;
const INNER_R = 75;

function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

function describeSegment(cx, cy, innerR, outerR, startAngle, endAngle) {
  const midAngle = (startAngle + endAngle) / 2;
  const gap = 1.5; // visual gap between segments in degrees
  const s = startAngle + gap / 2;
  const e = endAngle - gap / 2;

  const p1 = polarToCartesian(cx, cy, innerR, s);
  const p2 = polarToCartesian(cx, cy, outerR, s);
  const p3 = polarToCartesian(cx, cy, outerR, e);
  const p4 = polarToCartesian(cx, cy, innerR, e);

  return {
    d: [
      `M ${p1.x} ${p1.y}`,
      `L ${p2.x} ${p2.y}`,
      `A ${outerR} ${outerR} 0 0 1 ${p3.x} ${p3.y}`,
      `L ${p4.x} ${p4.y}`,
      `A ${innerR} ${innerR} 0 0 0 ${p1.x} ${p1.y}`,
      'Z',
    ].join(' '),
    labelPos: polarToCartesian(cx, cy, (innerR + outerR) / 2, midAngle),
    midAngle,
  };
}

const RAG_HEX = { green: '#16A34A', amber: '#D97706', red: '#DC2626' };

export default function ChangeWheel() {
  const { phaseHealth } = useToolkit();
  const navigate = useNavigate();
  const [hoveredPhase, setHoveredPhase] = useState(null);
  const [listView, setListView] = useState(false);

  const segmentAngle = 360 / 8;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Change Wheel</h2>
          <p className="text-sm text-gray-500 mt-0.5">Click any phase to open it</p>
        </div>
        <button
          onClick={() => setListView(v => !v)}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          aria-label={listView ? 'Switch to wheel view' : 'Switch to list view'}
        >
          {listView ? <Circle className="w-3.5 h-3.5" /> : <List className="w-3.5 h-3.5" />}
          {listView ? 'Wheel View' : 'List View'}
        </button>
      </div>

      {listView ? (
        <PhaseList phaseHealth={phaseHealth} navigate={navigate} />
      ) : (
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* SVG Wheel */}
          <div className="flex-shrink-0">
            <svg
              width={WHEEL_SIZE}
              height={WHEEL_SIZE}
              viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
              className="max-w-full"
              role="img"
              aria-label="Change Engagement Wheel — click a segment to navigate to that phase"
            >
              {phaseHealth.map((phase, idx) => {
                const startAngle = idx * segmentAngle;
                const endAngle = startAngle + segmentAngle;
                const { d, labelPos, midAngle } = describeSegment(CX, CY, INNER_R, OUTER_R, startAngle, endAngle);
                const ragColor = RAG_HEX[phase.rag];
                const isHovered = hoveredPhase === phase.phaseId;
                const phaseData = PHASES[idx];

                return (
                  <g
                    key={phase.phaseId}
                    onClick={() => navigate(`/phase/${phase.phaseId}`)}
                    onMouseEnter={() => setHoveredPhase(phase.phaseId)}
                    onMouseLeave={() => setHoveredPhase(null)}
                    style={{ cursor: 'pointer' }}
                    role="button"
                    aria-label={`Phase ${phase.phaseNumber}: ${phase.phaseName} — ${phase.rag}`}
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && navigate(`/phase/${phase.phaseId}`)}
                  >
                    <path
                      d={d}
                      fill={phaseData.color}
                      opacity={isHovered ? 1 : 0.8}
                      stroke="white"
                      strokeWidth="2"
                      style={{ transition: 'opacity 0.15s ease' }}
                    />
                    {/* RAG indicator dot */}
                    <circle
                      cx={polarToCartesian(CX, CY, OUTER_R - 16, (startAngle + endAngle) / 2).x}
                      cy={polarToCartesian(CX, CY, OUTER_R - 16, (startAngle + endAngle) / 2).y}
                      r={6}
                      fill={ragColor}
                      stroke="white"
                      strokeWidth="1.5"
                    />
                    {/* Phase number */}
                    <text
                      x={labelPos.x}
                      y={labelPos.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="13"
                      fontWeight="700"
                      style={{ pointerEvents: 'none', userSelect: 'none' }}
                    >
                      {phase.phaseNumber}
                    </text>
                  </g>
                );
              })}

              {/* Centre circle */}
              <circle cx={CX} cy={CY} r={INNER_R - 4} fill="white" stroke="#e5e7eb" strokeWidth="1" />
              <text x={CX} y={CY - 10} textAnchor="middle" fill="#1A1A2E" fontSize="11" fontWeight="700">
                Change
              </text>
              <text x={CX} y={CY + 6} textAnchor="middle" fill="#1A1A2E" fontSize="11" fontWeight="700">
                Wheel
              </text>
              <text x={CX} y={CY + 22} textAnchor="middle" fill="#9ca3af" fontSize="9">
                ABSA
              </text>
            </svg>
          </div>

          {/* Legend / hover detail panel */}
          <div className="flex-1 w-full max-w-xs">
            {hoveredPhase ? (
              <HoverDetail phase={phaseHealth.find(p => p.phaseId === hoveredPhase)} />
            ) : (
              <PhaseLegend phaseHealth={phaseHealth} navigate={navigate} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function HoverDetail({ phase }) {
  if (!phase) return null;
  const phaseData = PHASES.find(p => p.id === phase.phaseId);
  const pct = phase.totalItems === 0 ? 0 : Math.round((phase.completedItems / phase.totalItems) * 100);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          style={{ backgroundColor: phaseData?.color }}
        >
          {phase.phaseNumber}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{phase.phaseName}</p>
          <RAGBadge status={phase.rag} size="sm" />
        </div>
      </div>
      <p className="text-xs text-gray-600 mb-4 leading-relaxed">{phaseData?.description}</p>
      <div className="flex items-center gap-3 mb-4">
        <ProgressRing pct={pct} size={48} strokeWidth={4} color="auto" />
        <div>
          <p className="text-sm font-semibold text-gray-900">{pct}% complete</p>
          <p className="text-xs text-gray-500">{phase.completedItems} of {phase.totalItems} items</p>
        </div>
      </div>
      {phase.owner && (
        <p className="text-xs text-gray-500">Owner: <span className="font-medium text-gray-700">{phase.owner}</span></p>
      )}
    </div>
  );
}

function PhaseLegend({ phaseHealth, navigate }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-gray-500 mb-3">All Phases</p>
      {phaseHealth.map(phase => {
        const pct = phase.totalItems === 0 ? 0 : Math.round((phase.completedItems / phase.totalItems) * 100);
        return (
          <button
            key={phase.phaseId}
            onClick={() => navigate(`/phase/${phase.phaseId}`)}
            className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 text-left transition-colors group"
          >
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: PHASES.find(p => p.id === phase.phaseId)?.color }} />
            <span className="text-xs text-gray-700 flex-1 truncate group-hover:text-gray-900">{phase.phaseNumber}. {phase.phaseName}</span>
            <RAGBadge status={phase.rag} size="sm" showDot={false} />
            <span className="text-xs text-gray-400 w-8 text-right">{pct}%</span>
          </button>
        );
      })}
    </div>
  );
}

function PhaseList({ phaseHealth, navigate }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {phaseHealth.map(phase => {
        const phaseData = PHASES.find(p => p.id === phase.phaseId);
        const pct = phase.totalItems === 0 ? 0 : Math.round((phase.completedItems / phase.totalItems) * 100);
        return (
          <button
            key={phase.phaseId}
            onClick={() => navigate(`/phase/${phase.phaseId}`)}
            className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-gray-300 hover:shadow-sm transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: phaseData?.color }}
              >
                {phase.phaseNumber}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-[#CC0000] transition-colors">
                  {phase.phaseName}
                </p>
                <RAGBadge status={phase.rag} size="sm" />
              </div>
              <ProgressRing pct={pct} size={36} strokeWidth={3} color="auto" />
            </div>
            <p className="text-xs text-gray-500 line-clamp-2">{phaseData?.description}</p>
          </button>
        );
      })}
    </div>
  );
}
