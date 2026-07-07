"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  AddToCartModal:false,
  cartdetail:[],
  grandTotal:"",
  deliveryCharges:""
};
const cartDetailSlice = createSlice({
  name: "cartDetail",
  initialState,
  reducers: {
    setCartDetailDispatch(state, action){
      state.cartdetail = action.payload;
    },
    setDispatchGrandTotal(state,action){
      state.grandTotal=action.payload
      // console.log("dispatchGrandTotalFun",state.grandTotal)
    },
    setDispatchDeliveryCharges(state,action){
      state.deliveryCharges=action.payload
      // console.log("dispatchDeliverChargesFun",state.deliveryCharges)
    },
    setAddToCartModalDispatch(state,action){
      state.AddToCartModal=action.payload
      // console.log("dispatchGrandTotalFun",state.grandTotal)
    },
  }
})
export const { setAddToCartModalDispatch,setCartDetailDispatch,setDispatchGrandTotal,setDispatchDeliveryCharges } = cartDetailSlice.actions;

export default cartDetailSlice.reducer;