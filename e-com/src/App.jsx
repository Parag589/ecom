import "./App.css";
import Navbars from "./components/Navbars";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes, Navigate } from "react-router-dom";
import Signin from "./components/Signin";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Seller from "./components/Seller";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Debugging log
    if (token) {
      axios
        .get("http://localhost:5000/user", {
          headers: { "x-auth-token": token },
        })
        .then((response) => {
          console.log("User data:", response.data); // Debugging log
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error); // Debugging log
          setUser(null);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div>
      <Navbars user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />

        <Route
          path="/signin"
          element={
            user ? (
              user.role === "seller" ? (
                <Navigate to="/seller" />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Signin setUser={setUser} />
            )
          }
        />

        <Route
          path="/seller"
          element={
            user ? (
              user.role === "seller" ? (
                <Seller />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/signin" />
            )
          }
        />

        <Route
          path="/cart"
          element={
            user ? (
              user.role === "user" ? (
                <Cart user={user} />
              ) : (
                <Navigate to="/seller" />
              )
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
