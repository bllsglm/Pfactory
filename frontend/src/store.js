import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice";
import { apiSlice } from './slices/apiSlice';
import goalSliceReducer from './slices/goalSlice';

const store = configureStore({
  reducer:{
    [apiSlice.reducerPath] : apiSlice.reducer,
    auth : authSliceReducer,
    goals : goalSliceReducer,
  },
  middleware : (getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware),
  devTools : true
})

export default store;