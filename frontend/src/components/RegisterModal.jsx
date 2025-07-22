import React, { useRef, useState } from 'react';
import './Modal.css';

const RegisterModal = ({ onClose }) => {
  const overlayRef = useRef(null);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    setSuccess('');
    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      setSuccess('Registration successful!');
      setForm({ username: '', email: '', password: '', role: '' });
      setTimeout(onClose, 1200);
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
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              style={{ width: '100%', padding: '8px' }}
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
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
          <div style={{ marginBottom: '1rem' }}>
            <select
              name="role"
              style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Role</option>
              <option value="bidder">Bidder</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          <button
            type="submit"
            style={{ width: '100%', padding: '10px', background: '#ffb300', border: 'none', borderRadius: '4px', fontWeight: '600' }}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
          {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
          {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
