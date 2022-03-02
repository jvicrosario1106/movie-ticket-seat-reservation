import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import movieReducer from "../slice/movieSlice";

export const store = configureStore({
  reducer: { authReducer, movieReducer },
});
