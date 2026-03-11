import { Download } from 'lucide-react';

/**
 * Generic export button. Handles CSV and JSON exports.
 * For CSV: pass headers (array of {key, label}) and rows (array of objects)
 * For JSON: pass data (any serialisable value) and filename
 */
export default function ExportButton({
  type = 'csv', // 'csv' | 'json'
  filename = 'export',
  headers,
  rows,
  data,
  label = 'Export',
  size = 'md',
  className = '',
}) {
  function handleExport() {
    if (type === 'csv') {
      exportCSV();
    } else {
      exportJSON();
    }
  }

  function exportCSV() {
    if (!headers || !rows) return;
    const headerRow = headers.map(h => `"${h.label}"`).join(',');
    const dataRows = rows.map(row =>
      headers.map(h => {
        const val = row[h.key] ?? '';
        return `"${String(val).replace(/"/g, '""')}"`;
      }).join(',')
    );
    const csv = [headerRow, ...dataRows].join('\n');
    downloadFile(csv, `${filename}.csv`, 'text/csv');
  }

  function exportJSON() {
    const json = JSON.stringify(data, null, 2);
    downloadFile(json, `${filename}.json`, 'application/json');
  }

  function downloadFile(content, name, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-1 gap-1',
    md: 'text-sm px-3 py-1.5 gap-1.5',
    lg: 'text-sm px-4 py-2 gap-2',
  };

  return (
    <button
      onClick={handleExport}
      className={`inline-flex items-center font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 ${sizeClasses[size]} ${className}`}
    >
      <Download className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      {label}
    </button>
  );
}
