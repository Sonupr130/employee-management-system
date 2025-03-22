import React from 'react';

const SuccessModal = ({ isVisible, onClose, message }) => {
  if (!isVisible) {
    return null; // Don't render anything if the modal is not visible
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm text-center">
        <div className="text-blue-500 mb-4">
          <span
            className="material-icons"
            style={{ fontSize: '80px' }} // Larger icon size
          >
            thumb_up
          </span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Success!</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onClose} // Call the onClose function when clicked
          className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
