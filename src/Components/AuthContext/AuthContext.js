import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; // For making HTTP requests

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            "http://127.0.0.1:3005/userdetails",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser(response.data); // Set user data on successful verification
        } catch (error) {
          console.log("Error verifying token:", error);
          setUser(null);
          localStorage.removeItem("token"); // Remove invalid token
        }
      }
    };

    verifyToken();
  }, []);
  const logout = () => {
    // Reset user state and remove token from local storage
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, setUser,logout  }}>
      {children}
    </AuthContext.Provider>
  );
};
