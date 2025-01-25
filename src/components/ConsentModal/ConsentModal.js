import React from 'react';
import './ConsentModal.css'; // For styling the modal

export function ConsentModal({ onClose, onConsent }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>We Value Your Privacy</h2>
        <p>Do you agree to see advertisements?</p>
        <div className="modal-actions">
          <button onClick={() => onConsent(true)}>Yes, I Agree</button>
          <button onClick={() => onConsent(false)}>No, Thanks</button>
        </div>
      </div>
    </div>
  );
}
