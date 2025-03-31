import React, { useState, useEffect, useRef } from 'react';
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

  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Function to handle login or logout action
  const handleLoginClick = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false); // Log out
      window.location.hash = 'home'; // Navigate to home after logout
    } else {
      window.location.hash = 'login'; // Navigate to login page
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
            {isLoggedIn ? 'Log Out' : 'Log In'} {/* Toggle login/logout */}
          </span>
        </nav>
        {menuOpen && <PopupMenu menuRef={menuRef} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      </div>
    </header>
  );
}

export default Header;

