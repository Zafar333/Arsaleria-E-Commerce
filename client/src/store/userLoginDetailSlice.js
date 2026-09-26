"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkUserLogin: [],
};
const userLoginDetailSlice = createSlice({
  name: "userLoginDetailSlice",
  initialState,
  reducers: {
    setCheckUserLoginSliceDispatch(state, action) {
      state.checkUserLogin = action.payload;
      // console.log("dispatchadminlogindetails", action.payload);
    },
  },
});
export const { setCheckUserLoginSliceDispatch } = userLoginDetailSlice.actions;

export default userLoginDetailSlice.reducer;
