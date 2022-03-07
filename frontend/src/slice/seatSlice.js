import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/api";

export const getSeats = createAsyncThunk(
  "seats/getSeats",
  async (seats, thunkAPI) => {
    try {
      const response = await API_URL.get("/api/seats");
      return response.data;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteSeats = createAsyncThunk(
  "setas/deleteSeats",
  async (seatId, thunkAPI) => {
    try {
      await API_URL.delete(`/api/seats/${seatId}`);
      return seatId;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createSeats = createAsyncThunk(
  "setas/createSeats",
  async (seat, thunkAPI) => {
    try {
      const response = await API_URL.post(`/api/seats`, seat);
      return response.data;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateSeats = createAsyncThunk(
  "seats/updateSeats",
  async (seat, thunkAPI) => {
    try {
      const response = await API_URL.patch(`/api/seats`, seat);
      console.log(response);
      return response.data;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  isCreated: null,
  isDeleted: null,
  isUpdated: null,
  isLoading: null,
  isFailed: null,
  isMessage: null,
  seats: [],
};

const seatReducer = createSlice({
  name: "seats",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getSeats.pending, (state, action) => {
        state.isCreated = false;
        state.isDeleted = false;
        state.isLoading = true;
        state.isFailed = false;
        state.isUpdated = false;
      })
      .addCase(getSeats.fulfilled, (state, action) => {
        state.isCreated = false;
        state.isDeleted = false;
        state.isLoading = false;
        state.isFailed = false;
        state.isMessage = null;
        state.isUpdated = false;
        state.seats = action.payload;
      })
      .addCase(getSeats.rejected, (state, action) => {
        state.isCreated = false;
        state.isDeleted = false;
        state.isLoading = false;
        state.isFailed = true;
        state.isMessage = null;
        state.isUpdated = false;
      })
      .addCase(createSeats.pending, (state, action) => {
        state.isCreated = false;
        state.isDeleted = false;
        state.isLoading = true;
        state.isFailed = false;
        state.isUpdated = false;
      })
      .addCase(createSeats.fulfilled, (state, action) => {
        state.isCreated = true;
        state.isDeleted = false;
        state.isLoading = false;
        state.isFailed = false;
        state.isMessage = null;
        state.isUpdated = false;
        state.seats.unshift(action.payload);
      })
      .addCase(createSeats.rejected, (state, action) => {
        state.isCreated = false;
        state.isDeleted = false;
        state.isLoading = false;
        state.isFailed = true;
        state.isMessage = null;
        state.isUpdated = false;
      })
      .addCase(deleteSeats.pending, (state, action) => {
        state.isCreated = false;
        state.isDeleted = false;
        state.isLoading = true;
        state.isFailed = false;
        state.isUpdated = false;
      })
      .addCase(deleteSeats.fulfilled, (state, action) => {
        state.isCreated = false;
        state.isDeleted = true;
        state.isLoading = false;
        state.isFailed = false;
        state.isMessage = null;
        state.isUpdated = false;
        state.seats = state.seats.filter((seat) => seat._id !== action.payload);
      })
      .addCase(deleteSeats.rejected, (state, action) => {
        state.isCreated = false;
        state.isDeleted = false;
        state.isLoading = false;
        state.isFailed = true;
        state.isMessage = null;
        state.isUpdated = false;
      })
      .addCase(updateSeats.pending, (state, action) => {
        state.isCreated = false;
        state.isDeleted = false;
        state.isLoading = true;
        state.isFailed = false;
        state.isUpdated = false;
      })
      .addCase(updateSeats.fulfilled, (state, action) => {
        state.isCreated = false;
        state.isDeleted = false;
        state.isLoading = false;
        state.isFailed = false;
        state.isMessage = null;
        state.isUpdated = true;
        state.seats = state.seats.map((seat) =>
          seat._id === action.payload._id ? action.payload : seat
        );
      })
      .addCase(updateSeats.rejected, (state, action) => {
        state.isCreated = false;
        state.isDeleted = false;
        state.isLoading = false;
        state.isFailed = true;
        state.isMessage = null;
        state.isUpdated = false;
      });
  },
});

export default seatReducer.reducer;
