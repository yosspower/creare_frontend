import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes/index.js";

<<<<<<< HEAD
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TrustBadges from "./components/trustBadges.jsx";
=======

import Layout from "./containers/Layout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Auth/Login.jsx";
>>>>>>> origin/main

const App = () => {
  return (
    <Router>
    <div className="overflow-hidden">
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/*" element={<Layout />} />
      </Routes>
    </div>
  </Router>
  );
};

export default App;
