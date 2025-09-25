import React, { useEffect } from 'react';
import { FaTimes, FaUpload, FaTrash } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ImageModal = ({ imageUrl, isOpen, onClose, isAdmin, onImageUpload, onImageRemove }) => {
  const { theme } = useTheme();

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Background overlay - always blurred and dark/light themed */}
      <div
        className={`absolute inset-0 ${theme === 'dark' ? 'bg-black bg-opacity-80' : 'bg-gray-800 bg-opacity-80'} backdrop-blur-lg transition-opacity duration-300`}
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="relative z-10 flex flex-col items-center justify-center transform scale-95 animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 focus:outline-none z-20"
          aria-label="Close"
        >
          <FaTimes />
        </button>

        {/* Enlarged Image - always a large circle */}
        <img
          src={imageUrl}
          alt="Enlarged Portrait"
          className="w-[80vmin] h-[80vmin] max-w-[600px] max-h-[600px] object-cover rounded-full shadow-lg border-4 border-pink-500 transition-transform duration-300"
        />

        {isAdmin && (
          <div className="absolute bottom-8 flex space-x-4 z-20">
            <label className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full cursor-pointer flex items-center transition-colors duration-300">
              <FaUpload className="mr-2" /> Upload Image
              <input type="file" className="hidden" onChange={onImageUpload} />
            </label>
            <button
              onClick={onImageRemove}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition-colors duration-300"
            >
              <FaTrash className="mr-2" /> Remove Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
