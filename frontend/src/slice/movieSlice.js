import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/api";

export const getMovies = createAsyncThunk(
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

export const postMovies = createAsyncThunk(
  "movies/postMovies",
  async (movie, thunkAPI) => {
    try {
      const response = await API_URL.post("/api/movies", movie);
      return response.data;
    } catch (err) {
      const { message } = err.response.data;

      return thunkAPI.rejectWithValue(message);
    }
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
      })
      .addCase(postMovies.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(postMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies.unshift(action.payload);
      })
      .addCase(postMovies.rejected, (state, action) => {
        state.isFailed = true;
        state.isSuccess = false;
        state.movies = action.payload;
      });
  },
});

export const {} = movieReducer.actions;

export default movieReducer.reducer;
