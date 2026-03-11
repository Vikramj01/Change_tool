import { useState } from 'react';

/**
 * Simple hover tooltip for methodology terms.
 * Wraps any inline content.
 */
export default function Tooltip({ term, definition, children }) {
  const [visible, setVisible] = useState(false);

  return (
    <span className="relative inline-block">
      <span
        className="border-b border-dotted border-gray-400 cursor-help"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        tabIndex={0}
        role="button"
        aria-describedby={`tooltip-${term}`}
      >
        {children || term}
      </span>
      {visible && (
        <span
          id={`tooltip-${term}`}
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg pointer-events-none"
        >
          <strong className="block mb-0.5">{term}</strong>
          {definition}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </span>
      )}
    </span>
  );
}
