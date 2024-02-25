import React, { useState, useEffect } from "react";
import FirstNavbar from "../Navbars/FirstNavbar";
import SecondNavbardropdown from "../Navbars/SecondNavbardropdown";
import Footer from "../Footer/Footer";
import axios from "axios";
import "./TrackOrder.css";

function TrackOrder() {
  const [profile, setProfile] = useState({
    firstName: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      const userToken = localStorage.getItem("token");
      if (!userToken) {
        console.error("No user token found in local storage.");
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
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <>
      <FirstNavbar />
      <SecondNavbardropdown username={`${profile.firstName}`} />
      <div className="track-order-body">
        <h3 className="track-heading">Track Orders</h3>
        <hr className="horizontal-line"></hr>
        <div className="track-orders">
          <p className="no-orders">No orders to be tracked.</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TrackOrder;
