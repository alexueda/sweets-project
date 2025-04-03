import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PopupMenu from './PopupMenu';
import '../css/Header.css';

function Header({ onSearchChange, setIsLoggedIn, isLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

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

  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      toggleMenu();
    } else {
      navigate('/login');
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
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/roulette" className="nav-link">Roulette</Link>
          <Link to="/personal" className="nav-link">Personal</Link>
          <span className="nav-link" onClick={handleLoginClick}>
            {isLoggedIn ? 'Settings' : 'Log In'}
          </span>
        </nav>
        {menuOpen && <PopupMenu menuRef={menuRef} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      </div>
    </header>
  );
}

export default Header;
