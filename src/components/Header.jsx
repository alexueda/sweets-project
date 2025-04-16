// src/components/Header.jsx
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PopupMenu from './PopupMenu';
import '../css/Header.css';

const Header = forwardRef(
  ({ onSearchChange, setIsLoggedIn, isLoggedIn, toggleSidebar }, ref) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    // Close the popup menu if clicked outside it.
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

    // When user is logged in, clicking the link toggles the popup menu.
    // Otherwise, navigate to the login page.
    const handleLoginClick = () => {
      if (isLoggedIn) {
        toggleMenu();
      } else {
        navigate('/login');
      }
    };

    return (
      <header className="header" ref={ref}>
        <div className="header-left">
          {/* Sidebar toggle button in header */}
          <button className="hamburger-toggle" onClick={toggleSidebar}>
            <i className="bi bi-list"></i>
          </button>
          <img src="../logo.png" alt="Sweet Tooth" className="logo" />
          <input
            type="text"
            placeholder="Search by dessert..."
            className="search-input"
            onChange={handleInputChange}
          />
        </div>

        <div className="header-right">
          <nav className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/roulette" className="nav-link">Roulette</Link>
            <Link to="/personal" className="nav-link">Personal</Link>
            <span className="nav-link" onClick={handleLoginClick}>
              {isLoggedIn ? 'Settings' : 'Login'}
            </span>
          </nav>
          {/* Render PopupMenu if menuOpen is true */}
          {menuOpen && (
            <PopupMenu
              menuRef={menuRef}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          )}
        </div>
      </header>
    );
  }
);

export default Header;
