import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import WasteSorting from "./Components/WasteSorting/WasteSorting";
import Home from "./Components/Home";
import CTA from "./Components/Login/CTA";
import Signup from "./Components/Login/Signup";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import Profile from "./Components/Profile/Profile";
import TrackOrder from "./Components/TrackOrder/TrackOrder";
import { AuthProvider, useAuth } from "./Components/AuthContext/AuthContext";

import "./App.css";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sorting" element={<WasteSorting />} />
        <Route path="/cta" element={<CTA />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/track-order"
          element={
            <ProtectedRoute>
              <TrackOrder />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
