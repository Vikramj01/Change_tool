import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function CollapsibleCard({
  title,
  children,
  defaultOpen = false,
  headerRight = null,
  className = '',
  titleClassName = '',
  icon = null,
  accent = null,
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-2 min-w-0">
          {accent && <div className="w-1 h-5 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />}
          {icon && <span className="flex-shrink-0 text-gray-500">{icon}</span>}
          <span className={`font-medium text-gray-900 truncate ${titleClassName}`}>{title}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          {headerRight}
          {open ? (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>
      {open && (
        <div className="border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  );
}
