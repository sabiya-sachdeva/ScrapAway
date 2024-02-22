import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function SecondNavBar(props) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Show the dropdown menu
  const showDropdown = () => {
    setIsDropdownVisible(true);
  };

  // Hide the dropdown menu
  const hideDropdown = () => {
    setIsDropdownVisible(false);
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
          <Link className="dropbtn">{" Hello, "}{props.username}
          <img src="dropdown.png" alt="" style={{ width:"15px" ,marginLeft:"6px",background:"white"}} />
          </Link> {/* Display fullName */}
          {isDropdownVisible && (
            <div className="dropdown-content">
              <Link to="/profile">Profile</Link>
              <Link to="/history">History</Link>
              <Link to="/track-order">Track Order</Link>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default SecondNavBar;