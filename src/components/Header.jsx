import React, { useState, useEffect, useRef } from 'react';
// src/components/Header.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopupMenu from './PopupMenu';
import '../css/Header.css';

function Header({ onSearchChange, setIsLoggedIn, isLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Update to show settings when logged in
  const handleLoginClick = () => {
    if (isLoggedIn) {
      toggleMenu(); // Show settings menu when logged in
    } else {
      window.location.hash = 'login'; // Navigate to login page if not logged in
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="site-title">Sweet Tooth</h1>
        <input
          type="text"
          placeholder="Search by dessert..."
          className="search-input"
          onChange={handleInputChange}
        />
      </div>

      <div className="header-right">
        <nav className="nav-links">
          <a href="#home" className="nav-link" onClick={() => window.location.hash = 'home'}>Home</a>
          <a href="#roulette" className="nav-link" onClick={() => window.location.hash = 'roulette'}>Roulette</a>
          <a href="#personal" className="nav-link" onClick={() => window.location.hash = 'personal'}>Personal</a>
          <span className="nav-link" onClick={handleLoginClick}>
            {isLoggedIn ? 'Settings' : 'Log In'} {/* Show Settings instead of Log Out */}
          </span>
        </nav>
        {menuOpen && <PopupMenu menuRef={menuRef} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      </div>
    </header>
  );
}

export default Header;
