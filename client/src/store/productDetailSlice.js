"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSizeProductDetail: [],
  grandTotal: [0],
  userLoginProductDetailPagePath: {},
};
const productDetailSlice = createSlice({
  name: "productDetailSlice",
  initialState,
  reducers: {
    setSelectedSizeProductDetailSliceDispatch(state, action) {
      state.selectedSizeProductDetail = action?.payload;
      // console.log("dispatchadminlogindetails",state.adminLoginDetail)
    },
    setDispatchGrandTotalProductDetailSlice(state, action) {
      state.grandTotal = action?.payload;
      // console.log("dispatchadminlogindetails",state.adminLoginDetail)
    },

    setUserLoginProductDetailPagePathSliceDispatch(state, action) {
      state.userLoginProductDetailPagePath = action?.payload;
    },
  },
});
export const {
  setSelectedSizeProductDetailSliceDispatch,
  setDispatchGrandTotalProductDetailSlice,
  setUserLoginProductDetailPagePathSliceDispatch,
} = productDetailSlice.actions;

export default productDetailSlice.reducer;
