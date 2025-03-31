import React from 'react';
import '../css/PopupMenu.css';

function PopupMenu({ menuRef }) {
  return (
    <div className="popup-menu" ref={menuRef}>
      <h3>Settings</h3>
      <ul className="popup-menu-list">
        <li><a href="#account" className="popup-link">Account</a></li>
        <li><a href="#preferences" className="popup-link">Preferences</a></li>
        <li><a href="#logout" className="popup-link">Log Out</a></li>
      </ul>
    </div>
  );
}

export default PopupMenu;
