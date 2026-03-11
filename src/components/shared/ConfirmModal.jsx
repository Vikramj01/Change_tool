import { AlertTriangle } from 'lucide-react';

export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'default', // 'default' | 'danger'
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 z-10">
        <div className="flex items-start gap-3 mb-4">
          {variant === 'danger' && (
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
          )}
          <div>
            <h3 id="confirm-modal-title" className="text-base font-semibold text-gray-900">
              {title}
            </h3>
            {message && (
              <p className="mt-1 text-sm text-gray-600">{message}</p>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors focus:outline-none focus-visible:ring-2 ${
              variant === 'danger'
                ? 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500'
                : 'bg-red-700 hover:bg-red-800 focus-visible:ring-red-500'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
