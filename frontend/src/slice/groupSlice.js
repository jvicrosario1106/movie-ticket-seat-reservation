import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../api/api";

export const getGroups = createAsyncThunk(
  "group/getGroups",
  async (groups, thunkAPI) => {
    try {
      const response = await API_URL.get("/api/groups");
      return response.data;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteGroup = createAsyncThunk(
  "group/deleteGroup",
  async (groupId, thunkAPI) => {
    try {
      await API_URL.delete(`/api/groups/${groupId}`);
      return groupId;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createGroup = createAsyncThunk(
  "group/createGroup",
  async (group, thunkAPI) => {
    try {
      const response = await API_URL.post("/api/groups", group);
      return response.data;
    } catch (err) {
      const { message } = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  isCreated: null,
  isFailed: null,
  isDelete: null,
  isLoading: null,
  groups: [],
};

const groupReducer = createSlice({
  name: "group",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getGroups.pending, (state, action) => {
        state.isCreated = false;
        state.isFailed = false;
        state.isDelete = false;
        state.isLoading = true;
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        state.isCreated = false;
        state.isFailed = false;
        state.isDelete = false;
        state.isLoading = false;
        state.groups = action.payload;
      })
      .addCase(getGroups.rejected, (state, action) => {
        state.isCreated = false;
        state.isFailed = true;
        state.isDelete = false;
        state.isLoading = false;
        state.groups = [];
      })
      .addCase(createGroup.pending, (state, action) => {
        state.isCreated = false;
        state.isFailed = false;
        state.isDelete = false;
        state.isLoading = true;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.isCreated = true;
        state.isFailed = false;
        state.isDelete = false;
        state.isLoading = false;
        state.groups.unshift(action.payload);
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.isCreated = false;
        state.isFailed = true;
        state.isDelete = false;
        state.isLoading = false;
      })
      .addCase(deleteGroup.pending, (state, action) => {
        state.isCreated = false;
        state.isFailed = false;
        state.isDelete = false;
        state.isLoading = true;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.isCreated = false;
        state.isFailed = false;
        state.isDelete = true;
        state.isLoading = false;
        state.groups = state.groups.filter(
          (group) => group._id !== action.payload
        );
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.isCreated = false;
        state.isFailed = true;
        state.isDelete = false;
        state.isLoading = false;
      });
  },
});

export default groupReducer.reducer;
