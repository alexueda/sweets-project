import React, { useState } from "react";
import "../css/Register.css"; // Make sure to create and style this file

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || {};

    // Check if any fields are empty
    if (!username || !password || !confirmPassword) {
      setError("All fields must be filled.");
      return;
    }

    // Check if the username is already taken
    if (existingUsers[username]) {
      setError("Username already exists.");
      return;
    }

    // Check if the passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check if the password contains at least one number
    const passwordRegex = /\d/;
    if (!passwordRegex.test(password)) {
      setError("Password must contain at least one number.");
      return;
    }

    // If no errors, store the new user in localStorage
    existingUsers[username] = password;
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // Redirect to the login page after successful registration
    window.location.hash = "login";
  };

  return (
    <div className="register-page">
      <h1>Create an Account</h1>
      <div className="register-form">
        <input
          className="register-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="register-input"
          type="password"
          placeholder="Password (must contain a number)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="register-input"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="error-text">{error}</p>} {/* Apply correct class here */}
        <button className="register-button" onClick={handleRegister}>Register</button> {/* Apply correct class here */}
        <p>
          Already have an account? <a href="#login">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
