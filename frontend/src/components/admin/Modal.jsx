import React from "react";

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;
  const handleOverlayClick = (e) => {
    // Check if the click is on the overlay, not inside the modal content
    if (e.target === e.currentTarget) {
      // console.log(e.currentTarget)
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm items-center flex justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white  border-black border-2 p-5 rounded-lg shadow-lg relative overflow-y-auto">
        <button
          className="absolute top-2 right-3 text-gray-500 text-3xl"
          onClick={onClose} 
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
