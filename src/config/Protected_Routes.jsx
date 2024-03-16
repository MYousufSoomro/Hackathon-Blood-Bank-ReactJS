import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, Route } from "react-router-dom";

const Protected_Routes = () => {
  const userData = useSelector((state) => state.userData);
  const user = userData.isLoggedIn;
  console.log("user", userData.isLoggedIn);

  return <>{user ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default Protected_Routes;
