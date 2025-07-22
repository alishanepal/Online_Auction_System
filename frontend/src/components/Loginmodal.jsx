import React, { useRef, useState } from 'react';
import './Modal.css';

const Loginmodal = ({ onClose }) => {
  const overlayRef = useRef(null);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      // Set login state in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      // Store role in sessionStorage/localStorage
      if (data.user && data.user.role) {
        sessionStorage.setItem('role', data.user.role);
        localStorage.setItem('role', data.user.role);
      }
      // Redirect based on role
      if (data.user && data.user.role === 'seller') {
        window.location.href = '/seller';
      } else if (data.user && data.user.role === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/home';
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              style={{ width: '100%', padding: '8px' }}
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              style={{ width: '100%', padding: '8px' }}
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            style={{ width: '100%', padding: '10px', background: '#ffb300', border: 'none', borderRadius: '4px', fontWeight: '600' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Loginmodal;
