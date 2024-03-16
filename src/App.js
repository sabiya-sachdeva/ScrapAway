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
import Collector from "./Components/Collector/CollectorDashboard";
import ForgetPassword from "./Components/Login/ForgetPassword"

function App() {
  const login=localStorage.getItem("isloggedin")
  return (
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
      <Route path="/collector" element={<Collector />} />
      <Route path="/forgotpass" element={<ForgetPassword/>} />

    </Routes>
  );
}

export default App;
