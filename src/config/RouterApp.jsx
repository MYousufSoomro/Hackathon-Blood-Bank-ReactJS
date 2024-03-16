import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Protected_Routes from "./Protected_Routes";
import Public_Routes from "./Public_Routes";
import Recipents from "../pages/Recipents";
import Donors from "../pages/Donors";
import Profile from "../pages/Profile";

const RouterApp = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route element={<Public_Routes />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<Protected_Routes />}>
        <Route path="/donors" element={<Donors />} />
        <Route path="/recipents" element={<Recipents />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

export default RouterApp;
