"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSizeProductQunatity: {},
  userLoginProductDetailPagePath: {},
};
const productDetailSlice = createSlice({
  name: "productDetailSlice",
  initialState,
  reducers: {
    setSelectedSizeProductQuantitySliceDispatch(state, action) {
      state.selectedSizeProductQunatity = action.payload;
      // console.log("dispatchadminlogindetails",state.adminLoginDetail)
    },
    setUserLoginProductDetailPagePathSliceDispatch(state, action) {
      state.userLoginProductDetailPagePath = action.payload;
      // console.log("dispatchadminlogindetails",state.adminLoginDetail)
    },
  },
});
export const {
  setSelectedSizeProductQuantitySliceDispatch,
  setUserLoginProductDetailPagePathSliceDispatch,
} = productDetailSlice.actions;

export default productDetailSlice.reducer;
