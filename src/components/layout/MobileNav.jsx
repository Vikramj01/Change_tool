import { useEffect } from 'react';
import { X } from 'lucide-react';
import Sidebar from './Sidebar';

export default function MobileNav({ open, onClose }) {
  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handle = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute left-0 top-0 bottom-0 w-64 flex flex-col">
        <div className="relative h-full flex flex-col">
          <Sidebar onClose={onClose} />
          <button
            className="absolute top-3 right-3 p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 focus:outline-none"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
