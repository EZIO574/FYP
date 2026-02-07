import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  maxWidth = 'max-w-md' 
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    
    // Lock body scroll
    if (isOpen) document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`bg-white border border-slate-200 w-full ${maxWidth} p-6 rounded-2xl shadow-2xl transform transition-all scale-100 relative animate-fade-in z-10`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-900 font-display">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-900 transition-colors bg-slate-50 hover:bg-slate-100 p-2 rounded-full"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};