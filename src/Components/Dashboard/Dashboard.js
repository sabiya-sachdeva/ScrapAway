import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext"; // Corrected import statement
import SecondNavbardropdown from "../Navbars/SecondNavbardropdown";
import FirstNavbar from "../Navbars/FirstNavbar";
import TrashDetailsForm from "./TrashDetailsForm";

function Dashboard() {
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      // Check if user.firstName exists before setting it
      if (user.firstName) {
        setFirstName(user.firstName);
      }
    }
  }, [user, navigate]);

  return (
    <>
      <FirstNavbar />
      {/* Only render SecondNavbardropdown if firstName is available */}
      {firstName && <SecondNavbardropdown username={firstName} />}
      <TrashDetailsForm />
    </>
  );
}

export default Dashboard;
