import React from 'react';
import { useApp } from '../../context/AppContext';

export const ToastContainer = () => {
  const { toasts, dismissToast } = useApp();

  if (!toasts.length) return null;

  const getBorderColor = (type) => {
    switch (type) {
      case 'success': return 'border-l-4 border-l-fc-success';
      case 'error': return 'border-l-4 border-l-fc-danger';
      case 'warning': return 'border-l-4 border-l-fc-warning';
      default: return 'border-l-4 border-l-fc-accent';
    }
  };

  return (
    <div className="fixed top-[68px] right-4 sm:right-6 z-[3000] flex flex-col gap-2.5 pointer-events-none" aria-live="polite">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-3 bg-fc-surface/95 backdrop-blur-md border border-fc-border rounded-fc-md shadow-fc-card-hover px-4 py-3 min-w-[280px] max-w-[360px] animate-toast-slide-in transition-all duration-300 ${getBorderColor(toast.type)}`}
        >
          <div className="text-base shrink-0">
            {toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : toast.type === 'warning' ? '⚠️' : '⚡'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-bold text-fc-text-primary">{toast.title}</div>
            <div className="text-xs text-fc-text-secondary truncate">{toast.message}</div>
          </div>
          <button
            className="text-base text-fc-text-tertiary hover:text-fc-text-primary transition-colors p-1 leading-none shrink-0 cursor-pointer"
            onClick={() => dismissToast(toast.id)}
            aria-label="Close notification"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};
