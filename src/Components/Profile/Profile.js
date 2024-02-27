import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import FirstNavbar from "../Navbars/FirstNavbar";
import SecondNavbardropdown from "../Navbars/SecondNavbardropdown";
import Footer from "../Footer/Footer";

function Profile() {
  const [tempProfile, setTempProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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
        setProfile({ firstName, lastName, email });
        setTempProfile({ firstName, lastName, email });
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
    setTempProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const userToken = localStorage.getItem("token");
    if (!userToken) {
      console.error("No user token found in local storage.");
      setFeedback({ message: "User not authenticated.", isError: true });
      return; }
    try {
      const response = await axios.put(
        "http://127.0.0.1:3005/updateProfile",
        tempProfile,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          }, });
      console.log(response.data); 
      if (response.status === 200) {
        setProfile(tempProfile);

        setFeedback({
          message: "Profile updated successfully!",
          isError: false,
        });
      } else {
        setFeedback({ message: "Failed to update profile.", isError: true });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setFeedback({ message: "Failed to update profile.", isError: true });
    }
  };

  const handlePasswordUpdate = async () => {
    const userToken = localStorage.getItem("token");
    if (!userToken) {
      console.error("No user token found in local storage.");
      setFeedback({ message: "User not authenticated.", isError: true });
      return;
    }

    try {
      const response = await axios.put(
        "http://127.0.0.1:3005/updatePassword",
        {
          currentPassword: profile.currentPassword,
          newPassword: profile.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response.data); // Assuming the server returns a success message
      // Update feedback state
      setFeedback({
        message: "Password updated successfully!",
        isError: false,
      });
    } catch (error) {
      console.error("Error updating password:", error);
      setFeedback({ message: "Failed to update password.", isError: true });
    }
  };

  return (
    <>
      <FirstNavbar />
      <SecondNavbardropdown username={`${profile.firstName}`} />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-pic-section">
            <div className="profile-pic"></div>
            <div className="username">{`${profile.firstName} ${profile.lastName}`}</div>
            <div className="email">{`${profile.email}`}</div>
          </div>
        </div>
        <div className="profile-form">
          <form onSubmit={handleProfileUpdate} className="edit-profile">
            <p className="update-label">Update Profile Details</p>
            <hr className="horizontal-line" />
            <div className="form-section">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={tempProfile.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-section">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={tempProfile.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-section">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={tempProfile.email}
                onChange={handleChange}
              />
            </div>
            <div className="button-container">
              <button type="submit" className="save-button">
                Save Changes
              </button>
            </div>
            {feedback.message && (
              <div
                className={`feedback-message ${
                  feedback.isError ? "error" : "success"
                }`}
              >
                {feedback.message}
              </div>
            )}
          </form>
          <form onSubmit={handlePasswordUpdate} className="change-password">
            <p className="update-label">Change Password</p>
            <hr className="horizontal-line" />
            <div className="form-section">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                autoComplete="off"
                value={tempProfile.currentPassword}
                onChange={handleChange}
              />
            </div>
            <div className="form-section">
              <label htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                autoComplete="off"
                value={tempProfile.newPassword}
                onChange={handleChange}
              />
            </div>
            <div className="form-section">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="off"
                value={tempProfile.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="button-container">
              <button type="submit" className="save-button">
                Save Changes
              </button>
            </div>
            {feedback.message && (
              <div
                className={`feedback-message ${
                  feedback.isError ? "error" : "success"
                }`}
              >
                {feedback.message}
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
