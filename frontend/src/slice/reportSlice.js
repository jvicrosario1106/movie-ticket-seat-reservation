import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/api";

export const getReports = createAsyncThunk(
  "report/getReports",
  async (reports, thunkAPI) => {
    try {
      const response = await API_URL.get("/api/reports");
      return response.data;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  isLoading: null,
  isSuccess: null,
  isFailed: null,
  reports: null,
};

const reportReducer = createSlice({
  name: "report",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getReports.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
      })
      .addCase(getReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isFailed = false;
        state.reports = action.payload;
      })
      .addCase(getReports.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isFailed = true;
        state.reports = action.payload;
      });
  },
});

export default reportReducer.reducer;
