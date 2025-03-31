// src/components/Header.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopupMenu from './PopupMenu';
import '../css/Header.css';

function Header({ onSearchChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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
          <a href="#home" className="nav-link" onClick={() => navigate("/")}>Home</a>
          <a href="#roulette" className="nav-link">Roulette</a>
          <a href="#personal" className="nav-link" onClick={() => navigate("/favorites")}>Personal</a>
          <span className="nav-link menu-link" onClick={toggleMenu}>
            Menu
          </span>
        </nav>
        {menuOpen && <PopupMenu />}
      </div>
    </header>
  );
}

export default Header;
