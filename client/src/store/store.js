import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import filtersReducer from '../features/filters/filtersSlice'
import adminDetailSlice from "./adminDetailSlice.js";
import allProductsSlice from "./allProductsPageSlice.js";
import cartDetailSlice from "./cartDetailSlice.js";
import userLoginDetailSlice from "./userLoginDetailSlice.js";

const rootReducer = combineReducers({
  cartDetailSlice,
  adminDetailSlice,
  userLoginDetailSlice,
  allProductsSlice,
});

export const store = configureStore({ reducer: rootReducer });
