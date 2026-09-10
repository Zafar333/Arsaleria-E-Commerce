"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [],
  infiniteScrollingCursorData: [
    {
      nextCursor: null,
      hasMore: false,
    },
  ],
};
const allProductsSlice = createSlice({
  name: "allProductsSlice",
  initialState,
  reducers: {
    setAllProductsDispatch(state, action) {
      // console.log("allProducts payload", action?.payload);
      if (action?.payload?.data == "generalAllProductData") {
        state.allProducts = action?.payload?.allProductsData;
        // state.allProducts = [
        //   ...state?.allProducts,
        //   ...action?.payload?.allProductsData,
        // ];
      }
      if (action?.payload?.data == "selectedFilterData") {
        // console.log("selectedFilterData payload", action?.payload);

        state.allProducts = action?.payload?.allSelectedFiltersProductsData;
      }
    },
    setInfiniteScrollingCursorDataDispatch(state, action) {
      // console.log("infiniteScrollingCursorData payload", action.payload);
      state.infiniteScrollingCursorData = action.payload;
    },
  },
});
export const {
  setAllProductsDispatch,
  setInfiniteScrollingCursorDataDispatch,
} = allProductsSlice.actions;

export default allProductsSlice.reducer;
