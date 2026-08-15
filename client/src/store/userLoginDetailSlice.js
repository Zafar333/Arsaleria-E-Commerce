"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userLoginDetail: [],
};
const userLoginDetailSlice = createSlice({
  name: "userLoginDetailSlice",
  initialState,
  reducers: {
    setUserLoginDetailDispatch(state, action) {
      state.userLoginDetail = action.payload;
      //   console.log("dispatchadminlogindetails", action.payload);
    },
  },
});
export const { setUserLoginDetailDispatch } = userLoginDetailSlice.actions;

export default userLoginDetailSlice.reducer;
