import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import movieReducer from "../slice/movieSlice";
import registerReducer from "../slice/registerSlice";
import userReducer from "../slice/userSlice";
import theaterReducer from "../slice/theaterSlice";
import groupReducer from "../slice/groupSlice";
import seatReducer from "../slice/seatSlice";
import bookReducer from "../slice/bookSlice";
import ratingReducer from "../slice/ratingSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    movieReducer,
    registerReducer,
    userReducer,
    theaterReducer,
    groupReducer,
    seatReducer,
    bookReducer,
    ratingReducer,
  },
});
