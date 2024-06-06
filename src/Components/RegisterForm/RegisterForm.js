import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./RegisterForm.css"; // Import the CSS file

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody = {
      username: username,
      password: password,
      email: email,
      role: "user",
    };

    try {
      const response = await fetch("https://localhost:7246/api/User/Register", {
        method: "POST",
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const responseBody = await response.json();
        if (
          responseBody.username === username &&
          responseBody.role === "user"
        ) {
          setMessage("Registration successful");
        } else {
          setMessage("Registration failed");
        }
      } else {
        setMessage("Registration failed");
      }
    } catch (error) {
      setMessage("An error occurred");
    }
  };

  return (
    <div className="register-container">
      <div className="left">
        <h1>Welcome Reader!</h1>
        <p>
          You are 1 step behind in exploring your <a href="/desires">desires</a>
        </p>
      </div>
      <div className="right">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="buttons">
            <Link to="/login" className="login-btn">
              Login
            </Link>{" "}
            {/* Add link to login page */}
            <button type="submit" className="register-btn">
              Register
            </button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default RegisterForm;
