import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function CredentialMngmt({ isLoggedIn, setIsLoggedIn, closePopup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("isLoggedIn");
    if (storedUser === "true") setIsLoggedIn(true);
  }, [setIsLoggedIn]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

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

  const handleLogin = () => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || {};
    if (existingUsers[username] === password) {
      setIsLoggedIn(true);
      setError('');
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", username);
      navigate('/home', { replace: true });
      if (closePopup) closePopup();
    } else {
      setError('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigate('/login', { replace: true });
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
            to="#"
            className="menu-link"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
          >
            Log Out
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default CredentialMngmt;