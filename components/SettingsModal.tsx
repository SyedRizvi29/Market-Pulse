
import React from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * NOTE: This is a placeholder component for a settings modal.
 * It is not currently used in the main application but is provided
 to resolve build errors.
 */
const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-brand-surface p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-brand-text">Settings</h2>
          <button onClick={onClose} className="text-brand-text-muted hover:text-brand-text">&times;</button>
        </div>
        <div>
          <p className="text-brand-text-muted">Settings panel is under construction.</p>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-brand-primary text-white font-semibold rounded-md hover:bg-brand-primary-dark"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
