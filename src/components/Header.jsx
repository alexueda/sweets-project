// src/components/Header.jsx
import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="site-title">Sweets Project</h1>
        <input
          type="text"
          placeholder="Search by dessert..."
          className="search-input"
        />
      </div>
      <nav className="nav-links">
        <a href="#home" className="nav-link">Home</a>
        <a href="#roulette" className="nav-link">Roulette</a>
        <a href="#personal" className="nav-link">Personal</a>
      </nav>
    </header>
  );
}

export default Header;
