import React, { useEffect, useState } from "react";
import "./CollectTrash.css";
import FirstNavbar from "../Navbars/FirstNavbar";
import SecondNavbardropdown from "../Navbars/SecondNavbardropdown";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

function CollectTrash() {
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setFirstName(user.firstName);
    }
  }, [user, navigate]);
  return (
    <>
      {" "}
      <div>
        {user && (
          <>
            <FirstNavbar />
            <SecondNavbardropdown username={firstName} />
            <h3>Waste Details</h3>
            <div className="trash-details-container">
              <div className="left-column">
                <div className="garbage-info">
                  <img src="garbage_image.jpg" alt="Garbage" />
                  <div className="seller-details">
                    <p>Name: John Doe</p>
                    <p>Contact: +1234567890</p>
                    <p>Email: johndoe@example.com</p>
                  </div>
                </div>
              </div>
              <div className="right-column">
                <h5>Confirm Garbage Collection</h5>
                <form>
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" name="name" required />
                  <label htmlFor="contact">Contact:</label>
                  <input type="text" id="contact" name="contact" required />
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" required />
                  <button className="collectTrash" type="submit">Submit</button>
                </form>
              </div>
            </div>
            <Footer />
          </>
        )}
      </div>
    </>
  );
}

export default CollectTrash;
