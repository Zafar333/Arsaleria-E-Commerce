import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
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
const persistConfig = {
  key: "root",
  storage,

  // These reducers will NOT be persisted
  blacklist: [
    "allProductsSlice",
    "adminDetailSlice",
    "userLoginDetailSlice",
    "cartDetailSlice",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// export const store = configureStore({ reducer: rootReducer });
