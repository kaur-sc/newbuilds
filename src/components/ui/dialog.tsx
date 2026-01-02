import { type ReactNode, useEffect } from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export function Dialog({ isOpen, onClose, title, children, className = '' }: DialogProps) {
  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[9998]" onClick={onClose} />
      <div className={`bg-card w-full max-w-md rounded-2xl shadow-2xl border border-border flex flex-col max-h-[90vh] relative z-[9999] ${className}`}>
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h3 className="h3">{title}</h3>
          <button
            onClick={onClose}
            className="btn-ghost p-1 text-2xl leading-none hover:bg-muted rounded-lg"
            aria-label="Close dialog"
          >
            &times;
          </button>
        </div>
        <div className="overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
