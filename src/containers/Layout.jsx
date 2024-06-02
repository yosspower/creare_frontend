import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Header from "../components/Header";
import { routes } from "../routes";
import Menu from "../components/Menu";
import Sidebar from "../components/Sidebar";
import TrustBadges from "../components/trustBadges";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <>
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
    </>
  );
}
