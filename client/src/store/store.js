import { combineReducers,configureStore } from '@reduxjs/toolkit'
// import filtersReducer from '../features/filters/filtersSlice'
import cartDetailSlice from "./cartDetailSlice.js"
import adminDetailSlice from "./adminDetailSlice.js" 


const rootReducer = combineReducers({
        cartDetailSlice,
        adminDetailSlice
})

export const store = configureStore({reducer:rootReducer})