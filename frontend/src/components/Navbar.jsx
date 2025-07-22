import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Loginmodal from './Loginmodal';
import RegisterModal from './RegisterModal';

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('isLoggedIn'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    window.location.reload();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
    alert(`Searching for: ${search}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="#" className="navbar-link">Home</a>
        <a href="#" className="navbar-link">Live Auction</a>
        <a href="#" className="navbar-link">Upcoming Auction</a>
        <a href="#" className="navbar-link">Closed Auction</a>
      </div>
      <div className="navbar-center">
        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <button className="navbar-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <button className="navbar-btn" onClick={() => setShowLogin(true)}>Login</button>
            <button className="navbar-btn" onClick={() => setShowRegister(true)}>Sign Up</button>
          </>
        )}
      </div>
      {showLogin && <Loginmodal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </nav>
  );
};

export default Navbar;
