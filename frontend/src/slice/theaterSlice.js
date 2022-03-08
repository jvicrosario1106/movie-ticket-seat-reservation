import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/api";

export const getTheaters = createAsyncThunk(
  "theater/getTheaters",
  async (theaters, thunkAPI) => {
    try {
      const response = await API_URL.get("/api/theaters");
      return response.data;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createTheater = createAsyncThunk(
  "theater/createTheater",
  async (theater, thunkAPI) => {
    try {
      const response = await API_URL.post("/api/theaters", theater);
      return response.data;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTheater = createAsyncThunk(
  "theater/deleteTheater",
  async (theaterID, thunkAPI) => {
    try {
      await API_URL.delete(`/api/theaters/${theaterID}`);
      return theaterID;
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
  isDeleted: null,
  theaters: [],
  isCreated: null,
  isMessage: null,
};

const theaterReducer = createSlice({
  name: "theater",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTheaters.pending, (state, action) => {
        state.isLoading = true;
        state.isFailed = false;
        state.isSuccess = false;
        state.isDeleted = false;
        state.isCreated = false;
      })
      .addCase(getTheaters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFailed = false;
        state.isSuccess = true;
        state.isDeleted = false;
        state.isCreated = false;
        state.theaters = action.payload;
      })
      .addCase(getTheaters.rejected, (state, action) => {
        state.isLoading = false;
        state.isFailed = true;
        state.isSuccess = false;
        state.isDeleted = false;
        state.isCreated = false;
        state.theaters = [];
      })
      .addCase(createTheater.pending, (state, action) => {
        state.isLoading = true;
        state.isFailed = false;
        state.isSuccess = false;
        state.isDeleted = false;
        state.isCreated = false;
      })
      .addCase(createTheater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFailed = false;
        state.isSuccess = true;
        state.isDeleted = false;
        state.isCreated = true;
        state.theaters.unshift(action.payload);
      })
      .addCase(createTheater.rejected, (state, action) => {
        state.isLoading = false;
        state.isFailed = true;
        state.isSuccess = false;
        state.isDeleted = false;
        state.isCreated = false;
      })
      .addCase(deleteTheater.pending, (state, action) => {
        state.isLoading = true;
        state.isFailed = false;
        state.isSuccess = false;
        state.isDeleted = false;
        state.isCreated = false;
      })
      .addCase(deleteTheater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFailed = false;
        state.isSuccess = true;
        state.isDeleted = false;
        state.isCreated = false;
        state.theaters = state.theaters.filter(
          (theater) => theater._id !== action.payload
        );
      })
      .addCase(deleteTheater.rejected, (state, action) => {
        state.isLoading = false;
        state.isFailed = true;
        state.isSuccess = false;
        state.isDeleted = false;
        state.isCreated = false;
      });
  },
});

const {} = theaterReducer.actions;

export default theaterReducer.reducer;
