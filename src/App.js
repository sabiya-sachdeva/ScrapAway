<<<<<<< HEAD
import FirstNavbar from "./Components/FirstNavbar";
import SecondNavbar from "./Components/SecondNavbar";
import WebHero from "./Components/WebHero";
import Corosuel from "./Components/Corosuel";
=======
import React from "react";
import { Routes, Route } from "react-router-dom";
import WasteSorting from "./Components/WasteSorting/WasteSorting";
import Home from "./Components/Home";
import CTA from "./Components/Login/CTA";
import Signup from "./Components/Login/Signup";

import Dashboard from "./Components/Dashboard/Dashboard";
import Profile from "./Components/Profile/Profile";
import TrackOrder from "./Components/TrackOrder/TrackOrder";
import Login from "./Components/Login/Login";
import "./App.css";
import CollectorDashboard from "./Components/Collector/CollectorDashboard";
import CollectTrash from "./Components/Collector/CollectTrash";

import ForgetPassword from "./Components/Login/ForgetPassword";

>>>>>>> Laiba-frontend
function App() {
  // const login=localStorage.getItem("isloggedin")
  return (
<<<<<<< HEAD
    <>
      <FirstNavbar />
      <SecondNavbar />
      <WebHero />
      <Corosuel/>
    </>
=======
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sorting" element={<WasteSorting />} />
      <Route path="/cta" element={<CTA />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/track-order" element={<TrackOrder />} />
      <Route path="/track-order" element={<TrackOrder />} />
      <Route path="/collector" element={<CollectorDashboard />} />
      <Route path="/forgotpass" element={<ForgetPassword />} />
      <Route path="/collecttrash" element={<CollectTrash />} />
    </Routes>
>>>>>>> Laiba-frontend
  );
}

export default App;
