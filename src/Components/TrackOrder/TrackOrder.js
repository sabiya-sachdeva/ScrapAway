import React, { useState, useEffect } from "react";
import FirstNavbar from "../Navbars/FirstNavbar";
import SecondNavbardropdown from "../Navbars/SecondNavbardropdown";
import Footer from "../Footer/Footer";
import axios from "axios";
import "./TrackOrder.css";

function TrackOrder() {
  const [profile, setProfile] = useState({ firstName: "" });
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    setTimeout(() => {
      const fetchedOrders = [
        // Static data used temporary
        { id: "1234", status: "Pickup Pending", estimatedPickup: "2024-03-10" },
        { id: "5678", status: "Pickup Pending", estimatedPickup: "2024-03-12" },
      ];
      setOrders(fetchedOrders);
      setIsLoading(false);
    }, 2000);
  };  useEffect(() => {
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
        <hr className="horizontal-line" />
        {isLoading ? (
          <div className="loading">Loading orders...</div>
        ) : orders.length > 0 ? (
          <div className="track-orders">
            {orders.map((order) => (
              <div key={order.id} className="order">
                <p>Order ID: {order.id}</p>
                <p>Status: {order.status}</p>
                <p>Estimated Pickup Date: {order.estimatedPickup}</p>
                <hr />
              </div>
            ))}
          </div>
        ) : (
          <div className="no-orders">No orders to be tracked.</div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default TrackOrder;
