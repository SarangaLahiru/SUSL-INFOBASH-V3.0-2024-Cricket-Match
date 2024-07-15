// src/App.jsx
import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { auth } from "../firebase";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLoginPage from "./admin/AdminLoginPage";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import TeamRegistration from "./pages/TeamRegistration";
import Teams from "./pages/Teams";

const App = () => {
  const [user, setUser] = useState(null); // Initialize user state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser); // Set user state when authentication state changes
    });

    return () => unsubscribe(); // Cleanup function for unsubscribe
  }, []);

  return (
    <Router>
      <NavBar user={user} /> {/* Render NavBar with user state */}
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/register" element={<TeamRegistration user={user} />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;