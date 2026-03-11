/**
 * Consistent empty state component for tables and lists.
 */
export default function EmptyState({ icon, title, description, action, className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      {icon && (
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-gray-400">
          {icon}
        </div>
      )}
      <p className="text-sm font-medium text-gray-900 mb-1">{title}</p>
      {description && (
        <p className="text-sm text-gray-500 mb-4 max-w-xs">{description}</p>
      )}
      {action && action}
    </div>
  );
}
