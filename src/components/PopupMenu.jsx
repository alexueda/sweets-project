import React from 'react';
import CredentialMngmt from './CredentialMngmt';
import '../css/PopupMenu.css';

function PopupMenu({ menuRef, isLoggedIn, setIsLoggedIn }) {
  return (
    <div className="popup-menu" ref={menuRef}>
      <CredentialMngmt isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}

export default PopupMenu;
