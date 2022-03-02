import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/api";

const getMovies = createAsyncThunk(
  "movies/getMovies",
  async (movie, thunkAPI) => {
    try {
      const response = await API_URL.get("/api/movies");
      return response.data;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const postMovies = createAsyncThunk(
  "movies/postMovies",
  async (movie, thunkAPI) => {
    try {
    } catch (err) {}
  }
);

const initialState = {
  movies: [],
  isSuccess: null,
  isFailed: null,
  isLoading: null,
};

const movieReducer = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.isFailed = true;
        state.movies = action.payload;
      });
  },
});

export const {} = movieReducer.actions;

export default movieReducer.reducer;
