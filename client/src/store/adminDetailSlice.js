"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminLoginDetail:[],
};
const adminDetailSlice = createSlice({
  name: "adminDetailSlice",
  initialState,
  reducers: {
    setAdminLoginDetailDispatch(state, action){
      state.adminLoginDetail = action.payload;
      // console.log("dispatchadminlogindetails",state.adminLoginDetail)
    },
   
  }
})
export const {setAdminLoginDetailDispatch} = adminDetailSlice.actions;

export default adminDetailSlice.reducer;