import { Construction } from 'lucide-react';

// Steps tab is implemented in Sprint 4.
// For Sprint 1, this provides a working placeholder so routes don't break.
export default function StepsTab({ phase }) {
  return (
    <div className="p-6 flex flex-col items-center justify-center py-20 text-center">
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Construction className="w-6 h-6 text-gray-400" />
      </div>
      <p className="text-sm font-medium text-gray-700 mb-1">Steps & Tools — Coming in Sprint 4</p>
      <p className="text-sm text-gray-500 max-w-sm">
        Interactive step-by-step worksheets for Phase {phase.number} will be available in the next build. Use the Checklist tab to track progress now.
      </p>
    </div>
  );
}
