import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/api";

export const createBook = createAsyncThunk(
  "book/createBook",
  async (book, thunkAPI) => {
    try {
      const response = await API_URL.post("/api/books", book, {
        withCredentials: true,
      });

      return response.data;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userBook = createAsyncThunk(
  "book/userBook",
  async (book, thunkAPI) => {
    try {
      const response = await API_URL.get("/api/books/userbook", {
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
  isCreated: null,
  isDeleted: null,
  isSuccess: null,
  isLoading: null,
  isFailed: null,
  books: [],
};

const bookReducer = createSlice({
  name: "book",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createBook.pending, (state, action) => {
        state.isUpdated = false;
        state.isCreated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isLoading = true;
        state.isFailed = false;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.isUpdated = false;
        state.isCreated = true;
        state.isDeleted = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.isFailed = false;
        state.books.unshift(action.payload);
      })
      .addCase(createBook.rejected, (state, action) => {
        state.isUpdated = false;
        state.isCreated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.isFailed = true;
      })
      .addCase(userBook.pending, (state, action) => {
        state.isUpdated = false;
        state.isCreated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isLoading = true;
        state.isFailed = false;
      })
      .addCase(userBook.fulfilled, (state, action) => {
        state.isUpdated = false;
        state.isCreated = false;
        state.isDeleted = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.isFailed = false;
        state.books = action.payload;
      })
      .addCase(userBook.rejected, (state, action) => {
        state.isUpdated = false;
        state.isCreated = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.isFailed = true;
      });
  },
});

export default bookReducer.reducer;
