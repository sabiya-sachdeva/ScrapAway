import React, { useState } from "react";
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="signup">
        <div>
          <div className="signup-content">
            <div className="signup-form">
              <a href="/">
                <img src="SAlogodark.png" alt="Logo" width="90%" />
              </a>
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
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pas"></label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={user.password}
                    onChange={handleinput}
                    autoComplete="off"
                    placeholder="Password"
                  />
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
                  />
                </div>
                <br />
                <div class="terms-container">
                  <label class="checkbox-container">
                    <input type="checkbox"></input>
                    <span class="checkmark"></span>I agree to the{" "}
                    <a href="url-to-terms">Terms and Conditions</a> and have
                    reviewed the <a href="url-to-privacy">Privacy Policy</a>.
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
                    Already have an account? <a href="/">Log In</a>
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
