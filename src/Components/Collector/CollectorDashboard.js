import React, { useEffect, useState } from "react";
import "./CollectorDashboard.css"; // Import CSS file for styling
import FirstNavbar from "../Navbars/FirstNavbar";
import SecondNavbardropdown from "../Navbars/SecondNavbardropdown";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

function Collector() {
  const [userdata, setUserdata] = useState([]);
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchInput, setSearchInput] = useState(""); // Initialize search input state

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setFirstName(user.firstName);
      fetchUserData();
    }
  }, [user, navigate]);

  const fetchUserData = () => {
    fetch("http://127.0.0.1:3005/searchwaste?searchInput=" + searchInput)
      .then((response) => response.json())
      .then((data) => setUserdata(data.map(item => ({
      ...item,
      imagePath: item.imagePath.replace(/\\/g, '/').replace('/uploads/', '/') // Replace backslashes and remove redundant "uploads" prefix
    }))))
      .catch((err) => console.log(err));
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data whenever search input changes
  }, [searchInput]);

  return (
    <div>
      {user && (
        <>
          <FirstNavbar />
          <SecondNavbardropdown username={firstName} />
          <h2>Waste available near me</h2>
          <div className="search-container">
            <input
              type="search"
              placeholder="Type of waste"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </div>
{/* 
          <div className="card-container"> */}
          <div className="trashavalaible-container">
            {userdata.length > 0 &&
              userdata.map((list, index) => (
                <div className="trashavalaible-card" key={index}>
                  <div className="trashavalaible-card-details">
                    <p>{list.name}</p>
                    <p>{list.address}</p>
                    <p>{list.typeofwaste}</p>
                  </div>
                  <div className="card-image">
                    <img
                      src={`http://127.0.0.1:3005${list.imagePath}`}
                      alt="Waste"
                    />
                  </div>
                  <button type="submit">Collect</button>
                </div>
              ))}
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default Collector;
