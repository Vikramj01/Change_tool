import { RAG_COLORS, RAG_LABELS } from '../../utils/ragCalculator';

/**
 * RAG status badge. Always includes text label — not colour alone.
 * size: 'sm' | 'md' | 'lg'
 */
export default function RAGBadge({ status = 'red', size = 'md', showDot = true }) {
  const colors = RAG_COLORS[status] || RAG_COLORS.red;
  const label = RAG_LABELS[status] || 'Unknown';

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5 gap-1',
    md: 'text-xs px-2 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${colors.bg} ${colors.text} ${colors.border} ${sizeClasses[size]}`}
      role="status"
      aria-label={`Status: ${label}`}
    >
      {showDot && (
        <span className={`rounded-full flex-shrink-0 ${colors.dot} ${dotSizes[size]}`} aria-hidden="true" />
      )}
      {label}
    </span>
  );
}
