import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody = {
      username: username,
      password: password,
      role: "user",
    };

    try {
      const response = await fetch("https://localhost:7246/api/User/Login", {
        method: "POST",
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const responseBody = await response.json();
        console.log("Login response:", responseBody); // Log the response

        if (
          responseBody.username === username &&
          responseBody.role === "user"
        ) {
          setMessage("Login successful");
          sessionStorage.setItem("token", responseBody.token);
          sessionStorage.setItem("username", responseBody.username);

          // Fetch all users to get the userId
          const usersResponse = await fetch("https://localhost:7246/api/User", {
            method: "GET",
            headers: {
              accept: "text/plain",
              Authorization: `Bearer ${responseBody.token}`,
            },
          });

          if (usersResponse.ok) {
            const users = await usersResponse.json();
            const loggedInUser = users.find(
              (user) => user.username === responseBody.username
            );

            if (loggedInUser) {
              sessionStorage.setItem("userId", loggedInUser.userId); // Store userId
              navigate("/profile");
            } else {
              setMessage("User not found");
            }
          } else {
            setMessage("Failed to fetch users");
          }
        } else {
          setMessage("Login failed");
        }
      } else {
        setMessage("Login failed");
      }
    } catch (error) {
      setMessage("An error occurred");
    }
  };

  return (
    <div className="login-container">
      <div className="left">
        <h1>Welcome Reader!</h1>
        <p>
          You are 1 step behind in exploring your <a href="/desires">desires</a>
        </p>
      </div>
      <div className="right">
        <h2>BOOKSTORE</h2>
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
          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          <div className="buttons">
            <Link to="/register" className="register-btn">
              Register
            </Link>
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default LoginForm;
