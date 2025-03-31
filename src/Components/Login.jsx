import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../css/Login.css"; 

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

  const handleLogin = () => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || {};
    if (existingUsers[username] === password) {
      setIsLoggedIn(true);
      navigate("/"); // Redirect to home after login
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
            New here?{" "}
            <span className="register-link" onClick={() => navigate("/register")}>
              Create an account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
