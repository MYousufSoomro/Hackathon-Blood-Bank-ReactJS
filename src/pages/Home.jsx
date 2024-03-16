import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../config/store/slices/theme";
import Hero_Slider from "../components/Hero_Slider";

const Home = () => {
  const disptach = useDispatch();
  const state = useSelector((state) => state.theme);
  // console.log(state.darkMode);

  const themeHandle = () => {
    disptach(toggleTheme(!state.darkMode));
  };

  return (
    <div>
      <Hero_Slider />

      {/* <Button onClick={themeHandle}>{state.darkMode ? "Light" : "Dark"}</Button> */}
    </div>
  );
};

export default Home;
