import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/api";

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (users, thunkAPI) => {
    try {
      const response = await API_URL.get("/api/users");
      return response.data;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, thunkAPI) => {
    try {
      await API_URL.delete(`/api/users/${userId}`);
      return userId;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    try {
      const response = await API_URL.patch(`/api/users`, user);

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
  user: [],
  isMessage: null,
  isUpdated: null,
  isDeleted: null,
};

const userReducer = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.isLoading = true;
        state.isFailed = false;
        state.isSuccess = false;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFailed = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isFailed = true;
        state.user = [];
        state.isMessage = null;
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.isLoading = true;
        state.isFailed = false;
        state.isSuccess = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFailed = false;
        state.isSuccess = true;
        state.isDeleted = false;
        state.user = state.user.filter((users) => users._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isFailed = true;
        state.isMessage = null;
        state.isDeleted = true;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.isLoading = true;
        state.isFailed = false;
        state.isSuccess = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFailed = false;
        state.isSuccess = true;
        state.isUpdated = true;
        state.user = state.user.map((users) =>
          users._id === action.payload._id ? action.payload : users
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isFailed = true;
        state.isMessage = action.payload;
        state.isUpdated = false;
      });
  },
});

export const {} = userReducer.actions;

export default userReducer.reducer;
