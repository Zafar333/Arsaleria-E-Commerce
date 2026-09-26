"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfileDetail: [],
};
const userProfileDetailSlice = createSlice({
  name: "userProfileDetailSlice",
  initialState,
  reducers: {
    setUserProfileDetailDispatch(state, action) {
      state.userProfileDetail = action.payload;
      // console.log("dispatchadminlogindetails", action.payload);
    },
  },
});
export const { setUserProfileDetailDispatch } = userProfileDetailSlice.actions;

export default userProfileDetailSlice.reducer;
