import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming axios is used for API requests
import "./Profile.css";
import FirstNavbar from "../Navbars/FirstNavbar";
import SecondNavbardropdown from "../Navbars/SecondNavbardropdown";
import Footer from "../Footer/Footer";

function Profile() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [feedback, setFeedback] = useState({ message: "", isError: false });

  useEffect(() => {
    const fetchProfileData = async () => {
      const userToken = localStorage.getItem("token");
      if (!userToken) {
        console.error("No user token found in local storage.");
        setFeedback({ message: "User not authenticated.", isError: true });
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:3005/userdetails", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        const { firstName, lastName, email } = response.data;
        console.log(response.data);
        setProfile((prevProfile) => ({
          ...prevProfile,
          firstName,
          lastName,
          email,
        }));
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setFeedback({
          message: "Failed to fetch profile data.",
          isError: true,
        });
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    console.log("Profile update logic here...");
    setFeedback({ message: "Profile updated successfully!", isError: false });
  };

  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    if (profile.newPassword !== profile.confirmPassword) {
      setFeedback({ message: "Passwords do not match.", isError: true });
      return;
    }
    // Placeholder for password change logic
    // Implement the API call to change the password here
    console.log("Password change logic here...");
    // Update feedback state based on the operation result
    setFeedback({ message: "Password changed successfully!", isError: false });
  };

  return (
    <>
      <FirstNavbar />
      <SecondNavbardropdown username={`${profile.firstName}`} />
      <div className="profile-container">
        {feedback.message && (
          <div
            className={`feedback-message ${
              feedback.isError ? "error" : "success"
            }`}
          >
            {feedback.message}
          </div>
        )}
        <div className="profile-card">
          <div className="profile-pic-section">
            <div className="profile-pic"></div>
            <div className="username">{`${profile.firstName} ${profile.lastName}`}</div>
            <div className="email">{`${profile.email}`}</div>
          </div>
        </div>
        <div className="profile-form">
          <form onSubmit={handleProfileSubmit} className="edit-profile">
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
            <div className="button-container">
              <button type="submit" className="save-button">
                Save Changes
              </button>
            </div>
          </form>
          <form
            onSubmit={handlePasswordChangeSubmit}
            className="change-password"
          >
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
            <div className="button-container">
              <button type="submit" className="save-button">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
