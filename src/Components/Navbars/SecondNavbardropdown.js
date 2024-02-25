import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function SecondNavBar(props) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();

  // Show the dropdown menu
  const showDropdown = () => {
    setIsDropdownVisible(true);
  };

  // Hide the dropdown menu
  const hideDropdown = () => {
    setIsDropdownVisible(false);
  };

  const handleLogout = () => {
    // Remove the token from localStorage or sessionStorage
    localStorage.removeItem("token"); // Assuming the token is stored in localStorage
    // Update any application state here if necessary
    // Redirect the user
    navigate("/login"); // Redirect to login page or home page as per your routing setup
  };

  return (
    <nav className="nav2">
      <ul>
        <li>
          <Link to="/">Blog</Link>
        </li>
        <li>
          <Link to="/">About</Link>
        </li>
        <li>
          <Link to="/">Contact</Link>
        </li>
        <li
          className="dropdown"
          onMouseEnter={showDropdown}
          onMouseLeave={hideDropdown}
        >
          <Link className="dropbtn">
            {" Hello, "}
            {props.username}
            <img
              src="dropdown.png"
              alt=""
              style={{ width: "15px", marginLeft: "6px", background: "white" }}
            />
          </Link>{" "}
          {/* Display fullName */}
          {isDropdownVisible && (
            <div className="dropdown-content">
              <Link to="/profile">Profile</Link>
              <Link to="/history">History</Link>
              <Link to="/track-order">Track Order</Link>
              <a onClick={handleLogout} href="/login">
                Logout
              </a>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default SecondNavBar;
