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
      state.allProducts = action.payload;
    },
    setAddProductsDispatch(state, action) {
      // console.log("allProducts payload", action?.payload);

      //  this function is for reated products remove statr here
      const existingIds = new Set(
        state.allProducts.map((product) => product.id),
      );

      const uniqueProducts = action.payload.filter((product) => {
        if (existingIds.has(product.id)) {
          return false;
        }

        existingIds.add(product.id);
        return true;
      });
      //  this function is for reated products remove end here

      state.allProducts.push(...uniqueProducts);
      // state.allProducts = [...state.allProducts, ...action.payload];
    },
    setInfiniteScrollingCursorDataDispatch(state, action) {
      // console.log("infiniteScrollingCursorData payload", action.payload);
      state.infiniteScrollingCursorData = action.payload;
    },
  },
});
export const {
  setAllProductsDispatch,
  setAddProductsDispatch,
  setInfiniteScrollingCursorDataDispatch,
} = allProductsSlice.actions;

export default allProductsSlice.reducer;
