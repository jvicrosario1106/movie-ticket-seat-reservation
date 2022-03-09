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

export const getMovie = createAsyncThunk(
  "movies/getMovie",
  async (movieId, thunkAPI) => {
    try {
      const response = await API_URL.get(`/api/movies/${movieId}`);
      return response.data;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  async (movie, thunkAPI) => {
    try {
      const response = await API_URL.patch(`/api/movies/${movie._id}`, movie);
      return response.data;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (movieId, thunkAPI) => {
    try {
      await API_URL.delete(`api/movies/${movieId}`);
      return movieId;
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

  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
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
      })
      .addCase(getMovie.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
      })
      .addCase(getMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies = action.payload;
      })
      .addCase(getMovie.rejected, (state, action) => {
        state.isFailed = true;
        state.isSuccess = false;
        state.isLoading = false;
      })
      .addCase(updateMovie.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies = action.payload;
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.isFailed = true;
        state.isSuccess = false;
        state.isLoading = false;
      })
      .addCase(deleteMovie.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isFailed = true;
      });
  },
});

export const { remove } = movieReducer.actions;

export default movieReducer.reducer;
