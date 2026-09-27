import React from 'react';
import { Check, Info, AlertCircle, X } from 'lucide-react';

export default function Toast({ toasts = [], onDismiss }) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-portal-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast-card toast-${t.type || 'success'}`}>
          <div className="toast-icon">
            {t.type === 'error' ? (
              <AlertCircle size={16} />
            ) : t.type === 'info' ? (
              <Info size={16} />
            ) : (
              <Check size={16} />
            )}
          </div>
          <span className="toast-message">{t.message}</span>
          <button
            type="button"
            className="toast-dismiss-btn"
            onClick={() => onDismiss(t.id)}
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
