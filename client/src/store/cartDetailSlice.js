"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  AddToCartModal: false,
  addToCartProduct: [],
  grandTotal: [0],
  deliveryCharges: "",
};
const cartDetailSlice = createSlice({
  name: "cartDetail",
  initialState,
  reducers: {
    setAddToCartDetailDispatch(state, action) {
      // console.log("addtocart", action.payload);

      if (state?.addToCartProduct?.length > 0) {
        const dataFind = state?.addToCartProduct?.findIndex(
          (item) =>
            item?.productVariantId == action.payload[0]?.productVariantId,
        );
        if (dataFind == "-1") {
          state.addToCartProduct = [
            ...state.addToCartProduct,
            ...action.payload,
          ];
        } else {
          let dat = [];
          state?.addToCartProduct?.map(
            (item) =>
              item?.productVariantId == action.payload[0]?.productVariantId &&
              dat.push({
                ...item,
                buyQuantity: item?.buyQuantity + 1,
              }),
          );
          state.addToCartProduct[dataFind] = dat[0];
        }
        // state.addToCartProduct = data;
      } else {
        state.addToCartProduct = [...state.addToCartProduct, ...action.payload];
      }
    },
    deleteProductCartDetailDispatch(state, action) {
      state.addToCartProduct = action.payload;
    },
    incrementDecrementProductCartDetailDispatch(state, action) {
      if (state?.addToCartProduct?.length > 0) {
        const findIndex = state?.addToCartProduct?.findIndex(
          (item) =>
            item?.productVariantId == action?.payload[0]?.productVariantId,
        );
        if (findIndex != "-1") {
          state.addToCartProduct[findIndex] = action?.payload[0];
        }

        // state.addToCartProduct = [...data, ...action.payload];
      }
    },
    setDispatchGrandTotal(state, action) {
      state.grandTotal = action.payload;
      // console.log("dispatchGrandTotalFun",state.grandTotal)
    },
    setDispatchDeliveryCharges(state, action) {
      state.deliveryCharges = action.payload;
      // console.log("dispatchDeliverChargesFun",state.deliveryCharges)
    },
    setAddToCartModalDispatch(state, action) {
      state.AddToCartModal = action.payload;
      // console.log("dispatchGrandTotalFun",state.grandTotal)
    },
  },
});
export const {
  setAddToCartModalDispatch,
  deleteProductCartDetailDispatch,
  incrementDecrementProductCartDetailDispatch,
  setAddToCartDetailDispatch,
  setDispatchGrandTotal,
  setDispatchDeliveryCharges,
} = cartDetailSlice.actions;

export default cartDetailSlice.reducer;
