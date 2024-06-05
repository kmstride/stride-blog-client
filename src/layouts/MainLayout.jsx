import React from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { setToken } from "../feature/rootSlice";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { ToastContainer } from "react-toastify";

function MainLayout() {
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  if (token) {
    dispatch(setToken(token));
  }
  return (
    <div className="container">
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default MainLayout;
