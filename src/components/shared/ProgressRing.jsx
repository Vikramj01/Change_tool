/**
 * Circular progress ring showing percentage.
 * size: pixel diameter of the ring
 * strokeWidth: ring thickness
 */
export default function ProgressRing({
  pct = 0,
  size = 64,
  strokeWidth = 5,
  color = '#16A34A',
  trackColor = '#e5e7eb',
  label = true,
  className = '',
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  const ringColor = pct >= 80 ? '#16A34A' : pct >= 50 ? '#D97706' : '#DC2626';
  const displayColor = color === 'auto' ? ringColor : color;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={displayColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.4s ease' }}
        />
      </svg>
      {label && (
        <span
          className="absolute text-xs font-semibold"
          style={{ color: displayColor, fontSize: size < 48 ? '0.65rem' : '0.75rem' }}
          aria-label={`${pct}% complete`}
        >
          {pct}%
        </span>
      )}
    </div>
  );
}
