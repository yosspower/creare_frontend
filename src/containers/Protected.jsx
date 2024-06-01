import React from "react";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Sidebar from "../components/Sidebar";
import TrustBadges from "../components/TrustBadges";
import Footer from "../components/Footer";
import { protectedRoutes } from "../routes/protected";
import { useSelector } from "react-redux";

export default function Protected() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  return isAuth ? (
    <>
      <Header />
      <Routes>
        {protectedRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<route.component />}
          ></Route>
        ))}
      </Routes>

      <Menu />
      <Sidebar />
      <Footer />
    </>
  ) : (
    <Navigate to={"/login"} />
  );
}
