"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterBtnState: false,
  allProductsBtnState: true,
};
const allProductsFilterSlice = createSlice({
  name: "allProductsFilterSlice",
  initialState,
  reducers: {
    setFilterBtnStateDispatch(state, action) {
      // console.log("allProducts payload", action?.payload);
      state.filterBtnState = action.payload;
    },
    setAllProductsBtnStateDispatch(state, action) {
      // console.log("allProducts payload", action?.payload);
      state.allProductsBtnState = action.payload;
    },
  },
});
export const { setFilterBtnStateDispatch, setAllProductsBtnStateDispatch } =
  allProductsFilterSlice.actions;

export default allProductsFilterSlice.reducer;
