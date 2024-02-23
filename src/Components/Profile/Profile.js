import React, { useState } from "react";
import "./Profile.css";
import FirstNavbar from "../Navbars/FirstNavbar";
import SecondNavBardropdown from "../Navbars/SecondNavbardropdown";

function Profile() {
  // State for form fields
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle profile update
  };

  return (
    <>
      <FirstNavbar />
      <SecondNavBardropdown />
      <div className="profile-container">
        <div className="profile-card">
          <div className="avatar-section">
            <div className="avatar"></div>
            <div className="username">
              {profile.firstName} {profile.lastName}
            </div>
            <div className="email">{profile.email}</div>
          </div>
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-section">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={profile.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-section">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={profile.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-section">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-section">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={profile.currentPassword}
                onChange={handleChange}
              />
            </div>
            <div className="form-section">
              <label htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={profile.newPassword}
                onChange={handleChange}
              />
            </div>
            <div className="form-section">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={profile.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
