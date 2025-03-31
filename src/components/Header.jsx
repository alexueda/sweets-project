import React, { useState, useEffect, useRef } from 'react';
import PopupMenu from './PopupMenu';
import '../css/Header.css';

function Header({ onSearchChange }) {
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

  return (
    <header className="header">
      {/* Left side: site title + search bar */}
      <div className="header-left">
        <h1 className="site-title">Sweet Tooth</h1>
        <input
          type="text"
          placeholder="Search by dessert..."
          className="search-input"
          onChange={handleInputChange}
        />
      </div>

      {/* Right side: nav items + optional popup */}
      <div className="header-right">
        <nav className="nav-links">
          <a href="#home" className="nav-link" onClick={() => window.location.hash = 'home'}>Home</a>
          <a href="#roulette" className="nav-link" onClick={() => window.location.hash = 'roulette'}>Roulette</a>
          <a href="#personal" className="nav-link" onClick={() => window.location.hash = 'personal'}>Personal</a>
          <span className="nav-link menu-link" onClick={toggleMenu}>
            Settings
          </span>
        </nav>
        {menuOpen && <PopupMenu menuRef={menuRef} />}
      </div>
    </header>
  );
}

export default Header;
