import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import movieReducer from "../slice/movieSlice";
import registerReducer from "../slice/registerSlice";
import userReducer from "../slice/userSlice";

export const store = configureStore({
  reducer: { authReducer, movieReducer, registerReducer, userReducer },
});
