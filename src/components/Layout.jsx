import React from "react";
import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import StickyFooter from "./Footer";

const Layout = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <Outlet />
      <StickyFooter />
    </div>
  );
};

export default Layout;
