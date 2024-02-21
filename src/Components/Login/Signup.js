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
    cpassword: "",
  };

  const [user, setUser] = useState(initialUserState);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  let name, value;
  const handleinput = (e) => {
    console.log(e);
    name = e.target.name;

    value = e.target.value;
    console.log(value);
    setUser({ ...user, [name]: value });
  };

  const postdata = async (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:3005/register", user)
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
    if (user.password !== user.cpassword) {
      setPasswordError("Passwords do not match");
      setConfirmPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
      setConfirmPasswordError("");
    }
  };

  return (
    <div className="cta-login-body">
      <div className="cta-form-container">
        <form className="cta-task-form" onSubmit={(e) => e.preventDefault()}>
          <div>
            <div className="signup">
              <div>
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
                    <form method="POST" className="register-form">
                      <div className="signup-form-group">
                        <label htmlFor="fname"></label>
                        <input
                          type="text"
                          name="fname"
                          id="fname"
                          value={user.fname}
                          onChange={handleinput}
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
                          onChange={handleinput}
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
                          onChange={handleinput}
                          autoComplete="off"
                          placeholder="Email"
                          onBlur={validateEmail}
                        />
                         {emailError && (
                          <p className="error-message">{emailError}</p>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="password"></label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          value={user.password}
                          onChange={handleinput}
                          autoComplete="off"
                          placeholder="Password"
                          onBlur={validatePassword}
                        />
                         {passwordError && (
                          <p className="error-message">{passwordError}</p>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="cpassword"></label>
                        <input
                          type="password"
                          name="cpassword"
                          id="cpassword"
                          value={user.cpassword}
                          onChange={handleinput}
                          autoComplete="off"
                          placeholder="Confirm password"
                          onBlur={validatePasswordConfirmation}
                        />
                         {confirmPasswordError && (
                          <p className="error-message">
                            {confirmPasswordError}
                          </p>
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
                        <button
                          type="submit"
                          className="signup-btn"
                          name="signup"
                          id="signup"
                          value="Register"
                          onClick={postdata}
                        >
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
        </form>
      </div>
    </div>
  );
}

export default Signup;
