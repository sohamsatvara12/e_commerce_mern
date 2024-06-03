import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75 p-10">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
        {children}
      </div>
    </div>
  );
}

export default Modal;
