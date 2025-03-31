import React, { useState, useEffect } from 'react';

function CredentialMngmt({ isLoggedIn, setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("isLoggedIn");
    if (storedUser === "true") setIsLoggedIn(true);
  }, []);

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
      window.location.hash = 'home'; // Navigate to home after successful login
    } else {
      setError('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    window.location.hash = 'home'; // Navigate to home after logout
  };

  return (
    <div>
      <h3>{isLoggedIn ? "Settings" : isRegistering ? "Create Account" : "Login"}</h3>
      {isLoggedIn ? (
        <ul>
          <li><a href="#account">Account</a></li>
          <li><a href="#preferences">Preferences</a></li>
          <li><button onClick={handleLogout}>Log Out</button></li>
        </ul>
      ) : (
        <ul>
          <li>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </li>
          <li>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          {error && <li style={{ color: 'red' }}>{error}</li>}
          <li>
            {isRegistering ? (
              <button onClick={handleRegister}>Create Account</button>
            ) : (
              <button onClick={handleLogin}>Login</button>
            )}
          </li>
          <li>
            <button onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? "Already have an account? Login" : "New user? Create an account"}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default CredentialMngmt;
