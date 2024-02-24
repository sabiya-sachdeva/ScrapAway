import React, { useState, useEffect } from "react";
import SecondNavbardropdown from "../Navbars/SecondNavbardropdown";
import FirstNavbar from "../Navbars/FirstNavbar";
import TrashDetailsForm from "./TrashDetailsForm";

async function fetchUserDetails() {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch("http://127.0.0.1:3005/userdetails", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(
        `Network response was not ok, status: ${response.status}`
      );
    }
    if (!response.headers.get("content-type")?.includes("application/json")) {
      throw new Error("Received non-JSON response");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}

function Dashboard() {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    fetchUserDetails().then((data) => {
      if (data && data.firstName) {
        setFirstName(data.firstName);
      }
    });
  }, []); // Run once on component mount
  return (
    <>
      <FirstNavbar />
      <SecondNavbardropdown username={firstName} />
      <TrashDetailsForm />
    </>
  );
}

export default Dashboard;
