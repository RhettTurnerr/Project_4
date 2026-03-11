import React, { useState } from "react";
import axios from "axios";
import "../styles/Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/auth/register", {
        email,
        password
      })
      .then((res) => {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || "Registration failed");
      });
  };

  return (
    <div className="auth-container">
      <h2>Create an Account</h2>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>

      {message && <p className="error-message">{message}</p>}

    </div>
  );
}

export default Register;