import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import "./Login.css";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const API_URL = "http://127.0.0.1:3005/login";
      const response = await axios.post(API_URL, credentials);

      const { token } = response.data;
      localStorage.setItem("token", token);

      // After storing the token
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
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
                  autoComplete="off"
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
              <div className="cta-login-container">
                <button type="submit" className="login-btn">
                  Login
                </button>
              </div>
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
      {/* <SecondNavbarDropdown username={fullName} /> */}
    </div>
  );
}

export default Login;
