// src/components/PopupMenu.jsx
import React from 'react';
import '../css/PopupMenu.css';

function PopupMenu() {
  return (
    <div className="popup-menu">
      <h3>Popup Menu</h3>
      <ul className="popup-menu-list">
        <li><a href="#profile" className="popup-link">Profile</a></li>
        <li><a href="#settings" className="popup-link">Settings</a></li>
        <li><a href="#logout" className="popup-link">Log Out</a></li>
      </ul>
    </div>
  );
}

export default PopupMenu;
