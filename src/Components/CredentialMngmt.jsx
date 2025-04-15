import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function CredentialMngmt({ isLoggedIn, setIsLoggedIn, closePopup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate();

  // Check if the user is logged in by reading localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("isLoggedIn");
    if (storedUser === "true") setIsLoggedIn(true);
  }, [setIsLoggedIn]);

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
      navigate('/home', { replace: true });       // Navigate to home after successful login
      if (closePopup) closePopup();
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
    navigate('/login', { replace: true });   // Navigate to login page
    if (closePopup) closePopup();
  };

  return (
    <div>
      <h3>Settings</h3>
      <ul className="popup-menu-list">
        <li>
          <Link 
            to="/account" 
            className="menu-link"
            onClick={() => closePopup && closePopup()}
          >
            Account
          </Link>
        </li>
        <li>
          <Link 
            to="/preferences" 
            className="menu-link"
            onClick={() => closePopup && closePopup()}
          >
            Preferences
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="menu-link"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            Log Out
          </button>
        </li>
      </ul>
      {/* Optionally, you could add a login form or registration fields here if needed */}
    </div>
  );
}

export default CredentialMngmt;
