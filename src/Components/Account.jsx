// src/components/Account.jsx
import React from 'react';
import '../css/Account.css';

function Account() {
  // In a real application you might receive this info via props or context.
  // For demonstration purposes, static placeholder text is used.
  return (
    <div className="account-page">
      <div className="account-container">
        <header className="account-header">
          <h1>My Account</h1>
        </header>
        <div className="account-info">
          <div className="profile-pic">
            {/* Replace the src with your real image path as needed */}
            <img src="/assets/byu_icon.png" alt="Profile" />
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
