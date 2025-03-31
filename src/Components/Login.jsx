import React, { useState } from "react";
import "../css/Login.css"; // Make sure to create and style this file

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || {};
    if (existingUsers[username] === password) {
      setIsLoggedIn(true);
      window.location.hash = "home"; // Navigate to home after login
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <div className="form-container">
        <div className="login-form">
          <input
            className="form-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="form-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-text">{error}</p>}
          <button className="form-button" onClick={handleLogin}>Log In</button>
          <p>
            New here? <a href="#register">Create an account</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
