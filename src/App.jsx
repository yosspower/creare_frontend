import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Layout from "./containers/Layout.jsx";

import Login from "./pages/Auth/Login.jsx";

import Register from "./pages/Auth/Register.jsx";
import { getProfile } from "./api/auth.js";
import { useDispatch } from "react-redux";
import { logOut, setAuth, setUser } from "./Toolkit/authSlice.js";
import Protected from "./containers/Protected.jsx";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function profile() {
      const res = await getProfile();
      const { status, results } = res;
      switch (status) {
        case 200:
          dispatch(setAuth());
          dispatch(setUser(results));
          break;

        default:
          dispatch(logOut());
          break;
      }
    }
    profile();
  }, []);
  return (
    <Router>
      <ScrollToTop />
      <div className="overflow-hidden">
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route path="/cr*" element={<Protected />} />
          <Route path="/*" element={<Layout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
