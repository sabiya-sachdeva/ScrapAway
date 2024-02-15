import React from "react";
import { Routes, Route } from "react-router-dom";
import WasteSorting from "./Components/WasteSorting/WasteSorting";
import Home from "./Components/Home";
import CTA from "./Components/Login/CTA";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sorting" element={<WasteSorting />} />
        <Route path="/login" element={<CTA />} />
      </Routes>
    </>
  );
}

export default App;
