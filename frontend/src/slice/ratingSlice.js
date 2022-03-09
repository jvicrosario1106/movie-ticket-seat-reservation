import {
  createSlice,
  createAsyncThunk,
  createNextState,
} from "@reduxjs/toolkit";
import { API_URL } from "../api/api";

export const getRating = createAsyncThunk(
  "rating/getRating",
  async (movieId, thunkAPI) => {
    try {
      const response = await API_URL.get(`/api/ratings/${movieId}`, {
        withCredentials: true,
      });

      return response.data;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createOrUpdateRating = createAsyncThunk(
  "rating/createOrUpdateRating",
  async (rating, thunkAPI) => {
    try {
      const response = await API_URL.post("/api/ratings", rating, {
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
  isUpdated: null,
  isSuccess: null,
  isLoading: null,
  isFailed: null,
  rating: null,
};

const ratingReducer = createSlice({
  name: "rating",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getRating.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isUpdated = false;
        state.isFailed = false;
      })
      .addCase(getRating.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdated = false;
        state.isFailed = false;
        state.rating = action.payload.length > 0 ? action.payload[0].rating : 0;
      })
      .addCase(getRating.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isUpdated = false;
        state.isFailed = true;
      })

      .addCase(createOrUpdateRating.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isUpdated = false;
        state.isFailed = false;
      })
      .addCase(createOrUpdateRating.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdated = false;
        state.isFailed = false;
        state.rating = action.payload.rating;
      })
      .addCase(createOrUpdateRating.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isUpdated = false;
        state.isFailed = true;
      });
  },
});

export default ratingReducer.reducer;
