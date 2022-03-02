import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/api";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, thunkAPI) => {
    try {
      const response = await API_URL.post("/api/auth/login", user, {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  user: null,
  isSuccess: null,
  isFailed: null,
  isLoading: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isFailed = "aye";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isFailed = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.user = action.payload;
      });
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
