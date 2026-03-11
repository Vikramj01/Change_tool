import { Users } from 'lucide-react';

export default function ChampionDirectory() {
  return (
    <div className="p-6 flex flex-col items-center justify-center py-24 text-center">
      <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center mb-4">
        <Users className="w-7 h-7 text-purple-400" />
      </div>
      <p className="text-base font-semibold text-gray-800 mb-1">Champion Network Directory</p>
      <p className="text-sm text-gray-500 max-w-sm">
        Champion registry with BU filtering, ratio tracking, and CSV export is coming in Sprint 6.
      </p>
    </div>
  );
}
