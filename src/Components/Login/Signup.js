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
  };

  const [user, setUser] = useState(initialUserState);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateEmail = () => {
    if (!user.email.includes("@")) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (user.password.length < 8) {
      setPasswordError(
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character"
      );
    } else {
      setPasswordError("");
    }
  };

  const validatePasswordConfirmation = () => {
    if (user.password !== user.confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const postdata = async (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:3005/register", {
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        password: user.password,
        cpassword: user.confirmPassword, // Ensure this line is correct
      })
      .then((res) => {
        console.log(res);
        setUser(initialUserState);

        // Redirect to homepage
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log(err);
      });
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
              <form method="POST" className="register-form" onSubmit={postdata}>
                <div className="signup-form-group">
                  <label htmlFor="fname"></label>
                  <input
                    type="text"
                    name="fname"
                    id="fname"
                    value={user.fname}
                    onChange={handleInputChange}
                    autoComplete="off"
                    placeholder="First Name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lname"></label>
                  <input
                    type="text"
                    name="lname"
                    id="lname"
                    value={user.lname}
                    onChange={handleInputChange}
                    autoComplete="off"
                    placeholder="Last Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email"></label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={user.email}
                    onChange={handleInputChange}
                    autoComplete="off"
                    placeholder="Email"
                    onBlur={validateEmail}
                  />
                  {emailError && <p className="error-message">{emailError}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="password"></label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={user.password}
                    onChange={handleInputChange}
                    autoComplete="off"
                    placeholder="Password"
                    onBlur={validatePassword}
                  />
                  {passwordError && (
                    <p className="error-message">{passwordError}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword"></label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleInputChange}
                    autoComplete="off"
                    placeholder="Confirm password"
                    onBlur={validatePasswordConfirmation}
                  />
                  {confirmPasswordError && (
                    <p className="error-message">{confirmPasswordError}</p>
                  )}
                </div>
                <br />
                <div className="terms-container">
                  <label className="checkbox-container">
                    <input type="checkbox"></input>
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
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    className="signup-btn"
                    name="signup"
                    id="signup"
                    value="Create Account"
                  />
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
