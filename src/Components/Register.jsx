import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // ✅ new success state
  const navigate = useNavigate();

  const handleRegister = () => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || {};

    if (!username || !password || !confirmPassword) {
      setError("All fields must be filled.");
      setSuccess("");
      return;
    }

    if (existingUsers[username]) {
      setError("Username already exists.");
      setSuccess("");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }

    const passwordRegex = /\d/;
    if (!passwordRegex.test(password)) {
      setError("Password must contain at least one number.");
      setSuccess("");
      return;
    }

    existingUsers[username] = password;
    localStorage.setItem("users", JSON.stringify(existingUsers));

    setError("");
    setSuccess("Registration successful! Redirecting to login...");

    // ✅ Redirect to login page after short delay
    setTimeout(() => {
      navigate("/login");
    }, 1500);
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

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>} {/* ✅ new message */}

        <button className="register-button" onClick={handleRegister}>Register</button>

        <p>
          Already have an account?{" "}
          <span className="login-link" onClick={() => navigate("/login")}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
