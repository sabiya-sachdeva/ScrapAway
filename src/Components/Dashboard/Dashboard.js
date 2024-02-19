import React from "react";
import SecondNavbardropdown from "../Navbars/SecondNavbardropdown"; // Adjust the import path as necessary
import FirstNavbar from "../Navbars/FirstNavbar";
import Footer from "../Footer/Footer";

function Dashboard() {
  return (
    <>
      <FirstNavbar />
      <SecondNavbardropdown username="Waste/Collect Garbage" />
      <Footer />
    </>
  );
}

export default Dashboard;
