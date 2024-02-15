import React, { useState } from "react";
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
          <a href="/">
            <img src="SAlogodark.png" alt="Logo" width="90%" />
          </a>
          <button
            type="button"
            className="cta-signup-btn"
            onClick={showSignupForm}
          >
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
            By signing up you agree to our <a href="/">Terms of Use</a> and{" "}
            <a href="/">Privacy Policy</a>.
          </p>
        </>
      );
    }
  };

  return (
    <div className="cta-login-body">
      <div className="cta-form-container">
        <form className="cta-task-form" onSubmit={(e) => e.preventDefault()}>
          {renderComponent()}
        </form>
      </div>
    </div>
  );
}

export default CTA;
