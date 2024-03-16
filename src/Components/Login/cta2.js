import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import "./CTA.css";

function CTA() {
  const [activeComponent, setActiveComponent] = useState("default");

  const showLoginForm = () => {
    setActiveComponent("login");
  };

  const showSignupForm = () => {
    setActiveComponent("signup");
  };

  const renderComponent = () => {
    if (activeComponent === "login") {
      return <Login />;
    } else if (activeComponent === "signup") {
      return <Signup />;
    } else {
      return (
        <>
          <Link to="/">
            <img
              src="SAlogodark.png"
              alt="Logo"
              width="100%"
              className="ToHomepage"
            />
          </Link>
          <button type="button" className="cta-signup-btn" onClick="/register">
            Sign up
          </button>
          <div className="cta-login-container">
            <button
              type="button"
              className="cta-login-btn"
              onClick={showLoginForm}
            >
              Log in
            </button>
          </div>
          <p className="terms-text">
            By signing up you agree to our{" "}
            <Link className="link" to="/">
              {" "}
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link className="link" to="/">
              {" "}
              Privacy Policy
            </Link>
            .
          </p>
        </>
      );
    }
  };

  return (
    <div className="cta-login-body">
      <div className="cta-form-container">
        <div className="cta-task-form" onSubmit={(e) => e.preventDefault()}>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default CTA;
