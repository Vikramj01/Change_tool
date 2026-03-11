import { BarChart3 } from 'lucide-react';

export default function AdoptionDashboard() {
  return (
    <div className="p-6 flex flex-col items-center justify-center py-24 text-center">
      <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
        <BarChart3 className="w-7 h-7 text-blue-400" />
      </div>
      <p className="text-base font-semibold text-gray-800 mb-1">Adoption Metrics Tracker</p>
      <p className="text-sm text-gray-500 max-w-sm">
        Wave progress, BU adoption table, and trend charts are coming in Sprint 6.
      </p>
    </div>
  );
}
