import React from "react";
import "./LoginForm.css";

function LoginForm() {
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
        <form>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          <div className="buttons">
            <button type="button" className="register-btn" disabled>
              Register
            </button>
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
