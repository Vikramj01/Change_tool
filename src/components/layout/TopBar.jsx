import { Menu, Check, Loader } from 'lucide-react';
import { useToolkit } from '../../context/ToolkitContext';

export default function TopBar({ onMenuClick, title }) {
  const { state } = useToolkit();
  const { savedIndicator, config } = state;

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 flex-shrink-0 z-10">
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        {/* Page title */}
        <h1 className="text-sm font-semibold text-gray-900 truncate max-w-[200px] sm:max-w-none">
          {title || config.programName || 'ABSA Change Toolkit'}
        </h1>
      </div>

      {/* Right: saved indicator */}
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center gap-1 text-xs transition-opacity duration-300 ${
            savedIndicator ? 'opacity-100' : 'opacity-0'
          }`}
          aria-live="polite"
          aria-label={savedIndicator ? 'Changes saved' : ''}
        >
          <Check className="w-3.5 h-3.5 text-green-600" />
          <span className="text-green-600 font-medium">Saved</span>
        </div>

        {/* ABSA Red accent */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#CC0000] flex items-center justify-center">
            <span className="text-white font-bold text-xs">A</span>
          </div>
        </div>
      </div>
    </header>
  );
}
