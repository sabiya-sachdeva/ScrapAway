import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Login.css";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3005/login",
        credentials
      );
      console.log(response.data); // Handle response data as needed
      // Redirect user after successful login, display message, etc.
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error, display error message, etc.
    }
  };

  return (
    <div className="cta-login-body">
      <div className="cta-form-container">
        <form className="cta-task-form" onSubmit={handleFormSubmit}>
          <div className="login">
            <div className="loginForm">
              <Link to="/">
                <img
                  src="SAlogodark.png"
                  alt="Logo"
                  width="100%"
                  className="ToHomepage"
                />
              </Link>
              <div>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter Your Email"
                  name="email"
                  value={credentials.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Your Password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                />
                <p className="terms-text">
                  Forgot your{" "}
                  <Link to="/" className="link">
                    email
                  </Link>{" "}
                  or{" "}
                  <Link to="/" className="link">
                    password?
                  </Link>
                </p>
              </div>
              <button type="submit" className="login-btn">
                Login
              </button>
              <p className="terms-text">
                New to ScrapAway?{" "}
                <Link to="/register" className="link">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
