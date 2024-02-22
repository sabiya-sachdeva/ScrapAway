import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SecondNavbardropdown from "../Navbars/SecondNavbardropdown";
import FirstNavbar from "../Navbars/FirstNavbar";
import Footer from "../Footer/Footer";
import Seller from "../Seller/Seller";


function Dashboard() {
  const [fullName, setFullName] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const fullNameFromQuery = params.get("fullName");
    if (fullNameFromQuery) {
      console.log("Full Name:", fullNameFromQuery);
      setFullName(fullNameFromQuery);
    }
  }, [location.search]);

  return (
    <>
      <FirstNavbar />
      <SecondNavbardropdown username={fullName} />
      <Seller />
      <Footer />
    </>
  );
}

export default Dashboard;
