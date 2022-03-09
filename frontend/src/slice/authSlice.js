import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/api";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, thunkAPI) => {
    try {
      const response = await API_URL.post("/api/auth/login", user, {
        withCredentials: true,
        method: "POST",
      });
      return response.data;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (user, thunkAPI) => {
    try {
      const response = await API_URL.get("/api/auth/logout", {
        withCredentials: true,
      });

      return response.data;
    } catch (err) {
      const message = "Can't Logout";
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
        state.isFailed = false;
        state.isSuccess = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isFailed = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (localStorage.getItem("user")) {
          localStorage.removeItem("user");
        }
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isFailed = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.user = action.payload;
      });
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
