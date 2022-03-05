import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/api";

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (user, thunkAPI) => {
    try {
      const response = await API_URL.post("/api/auth/register", user);

      return response.data;
    } catch (err) {
      const { message } = err.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  isSuccess: null,
  isFailed: null,
  isLoading: null,
  Message: null,
};

const registerReducer = createSlice({
  name: "register",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.Message = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isFailed = true;
        state.Message = action.payload;
      });
  },
});

export default registerReducer.reducer;
