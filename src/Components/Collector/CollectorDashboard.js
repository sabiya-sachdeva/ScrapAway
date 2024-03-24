import React, { useEffect, useState } from "react";
import "./CollectorDashboard.css";
import FirstNavbar from "../Navbars/FirstNavbar";
import SecondNavbardropdown from "../Navbars/SecondNavbardropdown";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

function CollectorDashboard() {
  const [userdata, setUserdata] = useState([]);
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedTypes, setSelectedTypes] = useState({
    Plastic: false,
    Paper: false,
    Glass: false,
    Metal: false,
    Organic: false,
    Steel: false,
    Iron: false,
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setFirstName(user.firstName);
      fetchUserData();
    }
  }, [user, navigate]);

  const fetchUserData = () => {
    fetch("http://127.0.0.1:3005/searchwaste")
      .then((response) => response.json())
      .then((data) =>
        setUserdata(
          data.map((item) => ({
            ...item,
            imagePath: item.imagePath
              .replace(/\\/g, "/")
              .replace("/uploads/", "/"),
          }))
        )
      )
      .catch((err) => console.log(err));
  };

  // Filter displayed trash based on selected types
  const displayedTrash = userdata.filter(
    (item) =>
      selectedTypes[item.typeofwaste] ||
      Object.values(selectedTypes).every((v) => !v) // Show all if no types are selected
  );

  const handleTypeChange = (type) => {
    setSelectedTypes((prevTypes) => ({
      ...prevTypes,
      [type]: !prevTypes[type],
    }));
  };

  return (
    <div>
      {user && (
        <>
          <FirstNavbar />
          <SecondNavbardropdown username={firstName} />
          <h3>Waste available near me</h3>
          <div className="page-layout">
            <div className="filter-container">
              <label className="lbl">Type of Waste</label>
              {Object.keys(selectedTypes).map((type) => (
                <div key={type}>
                  <input
                    type="checkbox"
                    id={type}
                    name={type}
                    checked={selectedTypes[type]}
                    onChange={() => handleTypeChange(type)}
                  />
                  <label htmlFor={type}>{type}</label>
                </div>
              ))}
            </div>
            <div className="trashavalaible-container">
              {displayedTrash.length > 0 ? (
                displayedTrash.map((list, index) => (
                  <div className="trashavalaible-card" key={index}>
                    <div className="trashavalaible-card-details">
                      <p>{list.name}</p>
                    </div>
                    <div className="trash-image">
                      <img
                        src={`http://127.0.0.1:3005${list.imagePath}`}
                        alt="Waste"
                      />
                    </div>
                    <button className="collectBtn" onClick={() => navigate("/collecttrash")}>
                      Collect
                    </button>
                  </div>
                ))
              ) : (
                <p>No trash items match your filters.</p>
              )}
            </div>
          </div>

          <Footer />
        </>
      )}
    </div>
  );
}

export default CollectorDashboard;
