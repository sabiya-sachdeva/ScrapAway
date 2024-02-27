import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Signup.css";

function Signup() {
  const initialUserState = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreedToPrivacy: false,
  };

  const [user, setUser] = useState(initialUserState);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!user.fname.trim()) {
      errors.fname = "**First name is required";
    }
    if (!user.lname.trim()) {
      errors.lname = "**Last name is required";
    }
    if (!user.email.trim()) {
      errors.email = "**Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = "**Email address is invalid";
    }
    if (!user.password.trim()) {
      errors.password = "**Password is required";
    } else if (user.password.length < 8) {
      errors.password = "**Password must be at least 8 characters long";
    }
    if (!user.confirmPassword.trim()) {
      errors.confirmPassword = "**Confirm password is required";
    } else if (user.confirmPassword !== user.password) {
      errors.confirmPassword = "**Passwords do not match";
    }
    if (!user.agreedToPrivacy) {
      errors.agreedToPrivacy = "**Please agree to the privacy policy";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (!user.agreedToPrivacy) {
        setErrors({ agreedToPrivacy: "**Please agree to the privacy policy" });
        return;
      }
      try {
        const response = await axios.post("http://127.0.0.1:3005/register", {
          fname: user.fname,
          lname: user.lname,
          email: user.email,
          password: user.password,
        });
        console.log(response.data);
        setUser(initialUserState);
        // Redirect to login page after successful registration
        window.location.href = "/login";
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="cta-login-body">
      <div className="cta-form-container">
        <div className="signup">
          <div className="signup-content">
            <div className="signup-form">
              <Link to="/">
                <img
                  src="SAlogodark.png"
                  alt="Logo"
                  width="100%"
                  className="ToHomepage"
                />
              </Link>
              <form onSubmit={handleSubmit} className="register-form">
                <div className="signup-form-group">
                  <label htmlFor="fname"></label>
                  <input
                    type="text"
                    name="fname"
                    id="fname"
                    value={user.fname}
                    onChange={handleChange}
                    placeholder="First Name"
                  />
                  {errors.fname && (
                    <p className="error-message">{errors.fname}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="lname"></label>
                  <input
                    type="text"
                    name="lname"
                    id="lname"
                    value={user.lname}
                    onChange={handleChange}
                    placeholder="Last Name"
                  />
                  {errors.lname && (
                    <p className="error-message">{errors.lname}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email"></label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={user.email}
                    placeholder="Email"
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="error-message">{errors.email}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password"></label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={user.password}
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <p className="error-message">{errors.password}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword"></label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={user.confirmPassword}
                    placeholder="Confirm password"
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <p className="error-message">{errors.confirmPassword}</p>
                  )}
                </div>

                <div className="terms-container">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      name="agreedToPrivacy"
                      checked={user.agreedToPrivacy}
                      onChange={handleChange}
                    />
                    <span className="checkmark"></span>I agree to the{" "}
                    <Link to="url-to-terms" className="link">
                      Terms and Conditions
                    </Link>{" "}
                    and have reviewed the{" "}
                    <Link to="url-to-privacy" className="link">
                      Privacy Policy
                    </Link>
                    .
                  </label>
                  {errors.agreedToPrivacy && (
                    <p className="error-message">{errors.agreedToPrivacy}</p>
                  )}
                </div>

                <div className="form-group form-button">
                  <button type="submit" className="signup-btn">
                    Create Account
                  </button>
                  <p className="terms-text">
                    Already have an account?{" "}
                    <Link className="link" to="/login">
                      Log In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
