import React, { useRef } from 'react';
import './Modal.css';

const RegisterModal = ({ onClose }) => {
  const overlayRef = useRef(null);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>Sign Up</h2>
        <form>
          <div style={{ marginBottom: '1rem' }}>
            <input type="text" placeholder="Username" style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input type="email" placeholder="Email" style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input type="password" placeholder="Password" style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <select style={{ width: '100%', padding: '8px', borderRadius: '4px' }} defaultValue="">
              <option value="" disabled>Select Role</option>
              <option value="bidder">Bidder</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', background: '#ffb300', border: 'none', borderRadius: '4px', fontWeight: '600' }}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
