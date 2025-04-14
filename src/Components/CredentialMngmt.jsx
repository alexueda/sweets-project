import React, { useState, useEffect } from 'react';

function CredentialMngmt({ isLoggedIn, setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  // Check if the user is logged in by reading localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("isLoggedIn");
    if (storedUser === "true") setIsLoggedIn(true);
  }, []);

  // Save login state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  // Save new user
  const handleRegister = () => {
    if (username && password) {
      const existingUsers = JSON.parse(localStorage.getItem('users')) || {};
      if (existingUsers[username]) {
        setError('Username already exists. Choose another.');
        return;
      }
      existingUsers[username] = password;
      localStorage.setItem('users', JSON.stringify(existingUsers));
      setIsRegistering(false);
      setError('Account created! You can log in now.');
    } else {
      setError('Please fill in both fields.');
    }
  };

  // Login check
  const handleLogin = () => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || {};
    if (existingUsers[username] === password) {
      setIsLoggedIn(true);
      setError('');
      localStorage.setItem("isLoggedIn", "true"); // Store login state in localStorage
      window.location.hash = 'home'; // Navigate to home after successful login
    } else {
      setError('Invalid username or password.');
    }
  };

  // Handle log out
  const handleLogout = () => {
    // Remove login data and set state to logged out
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    localStorage.removeItem("isLoggedIn");  // Clear login state from localStorage
    window.location.reload();  // Refresh the page to reset the UI
  };

  return (
    <div>
      <h3>Settings</h3>
      <ul className="popup-menu-list">
        <li><a href="#account" className="menu-link">Account</a></li>
        <li><a onClick={handleLogout} className="menu-link">Log Out</a></li> {/* Log out action */}
      </ul>
    </div>
  );
}

export default CredentialMngmt;
