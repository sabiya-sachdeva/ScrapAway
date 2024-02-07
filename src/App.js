import React from "react";
import { Routes, Route } from "react-router-dom";
import WasteSorting from "./Components/WasteSorting/WasteSorting";
import Home from "./Components/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sorting" element={<WasteSorting />} />
      </Routes>
    </>
  );
}

export default App;
