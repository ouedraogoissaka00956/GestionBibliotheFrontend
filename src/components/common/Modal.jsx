// ============================================
// src/components/common/Modal.jsx
// ============================================
import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all animate-slideUp">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white sticky top-0 rounded-t-3xl">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">{title}</h3>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
};

export default Modal;