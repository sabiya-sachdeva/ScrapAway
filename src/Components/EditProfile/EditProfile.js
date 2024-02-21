import React from "react";
import "./EditProfile.css";

function EditProfile() {
  return (
    <div>
      <div className="cta-form-container">
        <h1> EditProfile</h1>
        <form method="POST" className="register-form">
          <div className="signup-form-group">
            <label htmlFor="fname">Name</label>
            <input
              type="text"
              name="fname"
              id="fname"
              //   value={user.fname}
              //   onChange={handleinput}
              autoComplete="off"
              placeholder="Name"
            />
          </div>
          <br />
          <div className="signup-form-group">
            <label htmlFor="fname">Contact Number</label>
            <input
              type="text"
              name="fname"
              id="fname"
              //   value={user.fname}
              //   onChange={handleinput}
              autoComplete="off"
              placeholder="Contact Number"
            />
          </div>
          <br />
          <div className="signup-form-group">
            <label htmlFor="fname">Address</label>
            <input
              type="text"
              name="fname"
              id="fname"
              //   value={user.fname}
              //   onChange={handleinput}
              autoComplete="off"
              placeholder="Address"
            />
          </div>
          <br />
          <div className="signup-form-group">
            <label htmlFor="fname">PinCode</label>
            <input
              type="text"
              name="fname"
              id="fname"
              //   value={user.fname}
              //   onChange={handleinput}
              autoComplete="off"
              placeholder="PinCode"
            />
          </div>
          <br />
          <div className="signup-form-group">
            <label htmlFor="fname">Email</label>
            <input
              type="text"
              name="fname"
              id="fname"
              //   value={user.fname}
              //   onChange={handleinput}
              autoComplete="off"
              placeholder="Email"
            />

            <div className="form-group form-button">
              <button
                type="submit"
                className="signup-btn"
                name="signup"
                id="signup"
                value="Register"
                // onClick={postdata}
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
