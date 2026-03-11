/**
 * Derives RAG status from checklist completion percentage.
 * 0–49% → Red, 50–79% → Amber, 80–100% → Green
 */
export function calculateRAG(completedItems, totalItems) {
  if (totalItems === 0) return 'red';
  const pct = (completedItems / totalItems) * 100;
  if (pct >= 80) return 'green';
  if (pct >= 50) return 'amber';
  return 'red';
}

export const RAG_LABELS = {
  green: 'Green',
  amber: 'Amber',
  red: 'Red',
};

export const RAG_COLORS = {
  green: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300', dot: 'bg-green-500', hex: '#16A34A' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300', dot: 'bg-amber-500', hex: '#D97706' },
  red: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300', dot: 'bg-red-500', hex: '#DC2626' },
};
