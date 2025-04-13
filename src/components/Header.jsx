// src/components/Header.jsx
import React, { forwardRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PopupMenu from './PopupMenu';
import '../css/Header.css';

const Header = forwardRef(
  ({ onSearchChange, setIsLoggedIn, isLoggedIn, toggleSidebar }, ref) => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
      if (isLoggedIn) {
        // Optionally open a settings popup menu here.
      } else {
        navigate('/login');
      }
    };

    return (
      <header className="header" ref={ref}>
        <div className="header-left">
          <button className="hamburger-toggle" onClick={toggleSidebar}>
            <i className="bi bi-list"></i>
          </button>
          <img src="../logo.png" alt="Sweet Tooth" className="logo" />
          <input
            type="text"
            placeholder="Search by dessert..."
            className="search-input"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="header-right">
          <nav className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/roulette" className="nav-link">Roulette</Link>
            <Link to="/personal" className="nav-link">Personal</Link>
            <span className="nav-link" onClick={handleLoginClick}>
              {isLoggedIn ? 'Settings' : 'Log In'}
            </span>
          </nav>
          {/* Include PopupMenu if needed */}
        </div>
      </header>
    );
  }
);

export default Header;
