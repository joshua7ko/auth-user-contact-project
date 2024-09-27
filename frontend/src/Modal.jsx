import React, { useEffect } from "react";

export const Modal = ({ isOpen, toggleOpen, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        toggleOpen();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, toggleOpen]);

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={toggleOpen}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-lg shadow-lg p-4 flex flex-col w-auto mx-4"
        // style={{ maxHeight: '90%', maxWidth: '90%', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          onClick={toggleOpen}
          className="mt-4 text-white bg-red-500 hover:bg-red-600 rounded px-4 py-2 self-end"
        >
          Close
        </button>
      </div>
    </div>
  );
};
