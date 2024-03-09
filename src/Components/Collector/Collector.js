import React, { useEffect, useState } from "react";
import "./Collector.css"; // Import CSS file for styling
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

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setFirstName(user.firstName);
      fetchUserData();
    }
  }, [user, navigate]);
  
  const fetchUserData = () => {
    fetch("http://127.0.0.1:3005/user")
      .then((response) => response.json())
      .then((data) => setUserdata(data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {user && (
        <>
          <FirstNavbar />
          <SecondNavbardropdown username={firstName} />
          <h2>Waste available near me</h2>
          <div className="card-container">
            {userdata.map((list, index) => (
              <div className="card" key={index}>
                <p>{list.name}</p>
                <p>{list.address}</p>
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
