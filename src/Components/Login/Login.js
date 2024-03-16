import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../AuthContext/AuthContext";
import "./Login.css";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setUser } = useAuth(); // Use setUser from useAuth
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigateToNextComponent = useCallback(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);

      if (decodedToken && decodedToken.usertype) {
        if (decodedToken.usertype === "user") {
          navigate("/dashboard");
        } else if (decodedToken.usertype === "collector") {
          navigate("/collector");
        } else {
          console.error("Invalid user type in token:", decodedToken.usertype);
        }
        setUser(decodedToken);
      } else {
        console.error("User type not found in token");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, [navigate, setUser]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      // Redirect user to appropriate component if already logged in
      navigateToNextComponent();
    }
  }, [navigateToNextComponent]); // Depend on navigateToNextComponent to watch for changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const validate = () => {
    const errors = {};

    if (!credentials.email.trim()) {
      errors.email = "**Email cannot be left blank";
    }

    if (!credentials.password.trim()) {
      errors.password = "**Password cannot be left blank";
    }

    return errors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) {
      return;
    }

    try {
      const API_URL = "http://127.0.0.1:3005/login";
      const response = await axios.post(API_URL, credentials);

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", "true"); // Set flag indicating user is logged in
        console.log("Token stored:", token);
        navigateToNextComponent(); // Redirect to appropriate component
      } else {
        console.error("Token not received from server");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
                {errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}
              </div>
              <div>
                <div className="passwod-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter Your Password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    autoComplete="off"
                  />
                  <img
                    src={showPassword ? "eye-open.png" : "eye-close.png"}
                    alt=""
                    className="eyeimage"
                    onClick={togglePasswordVisibility}
                  />
                  {errors.password && (
                    <p className="error-message">{errors.password}</p>
                  )}
                </div>
                <p className="terms-text">
                  Forgot your{" "}
                  <Link to="/forgotpass" className="link">
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
    </div>
  );
}

export default Login;
