import React from 'react';
import './Modal.css';

const Loginmodal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>Login</h2>
        {/* Replace with your login form */}
        <form>
          <div style={{ marginBottom: '1rem' }}>
            <input type="text" placeholder="Username or Email" style={{ width: '100%', padding: '8px' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input type="password" placeholder="Password" style={{ width: '100%', padding: '8px' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', background: '#ffb300', border: 'none', borderRadius: '4px', fontWeight: '600' }}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Loginmodal;
