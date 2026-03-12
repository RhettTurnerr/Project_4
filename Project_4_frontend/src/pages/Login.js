import { useState } from "react";
import api from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    api
      .post("/auth/login", { email, password })
      .then((res) => {
        // console.log("Login success:", res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", email);
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        console.error("Login error:", err);

        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Login failed. Please try again.");
        }
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
