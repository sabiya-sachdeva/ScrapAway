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
      setFirstName(user.firstName);
    }
  }, [user, navigate]);

  return (
    <>
      <FirstNavbar />
      <SecondNavbardropdown username={firstName} />
      <TrashDetailsForm />
    </>
  );
}

export default Dashboard;
