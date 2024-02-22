import React from "react";
import { Routes, Route } from "react-router-dom";
import WasteSorting from "./Components/WasteSorting/WasteSorting";
import Home from "./Components/Home";
import CTA from "./Components/Login/CTA";
import Signup from "./Components/Login/Signup";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";

import MultiStepForm from "./Components/Seller/Seller";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sorting" element={<WasteSorting />} />
        <Route path="/cta" element={<CTA />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/contact" element={<MultiStepForm />} />
       
        
      </Routes>
    </>
  );
}

export default App;
