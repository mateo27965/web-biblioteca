import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && isOpen) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black flex items-center justify-center z-50 modal"
          onClick={handleOverlayClick}
        >
          <div className="p-4 rounded-lg modalcontenido">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;