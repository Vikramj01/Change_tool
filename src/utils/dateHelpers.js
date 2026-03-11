/**
 * Format an ISO8601 date string to a readable display format.
 */
export function formatDate(isoString) {
  if (!isoString) return '—';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });
}

/**
 * Returns a human-readable "time ago" string.
 */
export function timeAgo(isoString) {
  if (!isoString) return 'Never';
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(isoString);
}

/**
 * Returns number of days between a date and today.
 * Positive = days from today (future), negative = days ago (past).
 */
export function daysFromNow(isoString) {
  if (!isoString) return null;
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = date - now;
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Returns current date as ISO8601 string.
 */
export function nowISO() {
  return new Date().toISOString();
}

/**
 * Convert a date input value (YYYY-MM-DD) to ISO8601.
 */
export function dateInputToISO(value) {
  if (!value) return null;
  return new Date(value).toISOString();
}

/**
 * Convert ISO8601 to date input value (YYYY-MM-DD).
 */
export function isoToDateInput(isoString) {
  if (!isoString) return '';
  return isoString.slice(0, 10);
}

/**
 * Calculate the sprint day number given a sprint start date.
 */
export function sprintDayNumber(sprintStartISO) {
  if (!sprintStartISO) return null;
  const start = new Date(sprintStartISO);
  const now = new Date();
  const diff = now - start;
  if (diff < 0) return null;
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
}
