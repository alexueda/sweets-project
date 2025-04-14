// src/components/Account.jsx
import React from 'react';
import '../css/Account.css';
import byuIcon from '../assets/byu_icon.png';  // Import the image

function Account() {
  return (
    <div className="account-page">
      <div className="account-container">
        <header className="account-header">
          <h1>My Account</h1>
        </header>
        <div className="account-info">
          <div className="profile-pic">
            <img src={byuIcon} alt="Profile" />  {/* Use the imported image */}
          </div>
          <div className="account-details">
            <h2>John Doe</h2>
            <p className="email">john.doe@example.com</p>
            <p className="phone">(123) 456-7890</p>
            <div className="account-actions">
              <button className="btn edit-btn">Edit Profile</button>
              <button className="btn logout-btn">Log Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
