import React, { useState, useEffect, useRef } from 'react';
// src/components/Header.jsx
import { useNavigate } from 'react-router-dom';
import PopupMenu from './PopupMenu';
import '../css/Header.css';

function Header({ onSearchChange, setIsLoggedIn, isLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Handle search input change
  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  // Toggle menu open/close
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Handle login/logout navigation
  const handleLoginClick = () => {
    if (isLoggedIn) {
      toggleMenu(); // Show settings menu when logged in
    } else {
      navigate('/login'); // Navigate to login page if not logged in
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
          <a href="#home" className="nav-link" onClick={() => navigate('/')}>Home</a>
          <a href="#roulette" className="nav-link" onClick={() => navigate('/roulette')}>Roulette</a>
          <a href="#personal" className="nav-link" onClick={() => navigate('/personal')}>Personal</a>
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
