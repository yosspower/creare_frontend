import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes/index.js";

import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header";
import Menu from "./components/Menu";

import Footer from "./components/Footer";
import TrustBadges from "./components/TrustBadges.jsx";

const App = () => {
  return (
    <div className="overflow-hidden">
      <Router>
        <Header />
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            ></Route>
          ))}
        </Routes>
        <Menu />
        <Sidebar />
        <TrustBadges />
        <Footer />
      </Router>
    </div>
  );
};

export default App;
