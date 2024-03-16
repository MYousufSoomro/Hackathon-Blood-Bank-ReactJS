import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const userData = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setUserData } = userData.actions;

export default userData.reducer;
