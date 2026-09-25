"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSizeProductDetail: [],
  userLoginProductDetailPagePath: {},
};
const productDetailSlice = createSlice({
  name: "productDetailSlice",
  initialState,
  reducers: {
    setSelectedSizeProductDetailSliceDispatch(state, action) {
      state.selectedSizeProductDetail = action.payload;
      // console.log("dispatchadminlogindetails",state.adminLoginDetail)
    },
    setUserLoginProductDetailPagePathSliceDispatch(state, action) {
      state.userLoginProductDetailPagePath = action.payload;
      console.log(
        "dispatchadminlogindetails",
        state.userLoginProductDetailPagePath,
      );
    },
  },
});
export const {
  setSelectedSizeProductDetailSliceDispatch,
  setUserLoginProductDetailPagePathSliceDispatch,
} = productDetailSlice.actions;

export default productDetailSlice.reducer;
