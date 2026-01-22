import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

const initialState = {
  post: null,
  popularPosts: null,
  loading: false,
  error: null,
  status: null,
};

export const createPost = createAsyncThunk(
  "post/createPost",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/post/createpost", formData);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const getAllPost = createAsyncThunk(
  "post/getAllPost",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/post/getallpost");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true
        state.popularPosts = []
        state.post = []
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = true
        state.post = action.payload.post
        state.popularPosts = action.payload.popularPosts
        state.status = action.payload.msg
      })
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.payload.msg
        state.loading = false
        state.popularPosts = []
        state.post = []
        state.status = action.payload.msg
      })

      .addCase(getAllPost.pending, (state) => {
        state.error = null 
        state.loading = true
        state.popularPosts = null
        state.post = null
      })
      .addCase(getAllPost.fulfilled, (state, action) => {
        state.error = null
        state.loading = false
        state.post = action.payload.allpost
        state.popularPosts = action.payload.popularPosts
        state.status = action.payload.msg

      })
      .addCase(getAllPost.rejected, (state, action) => {
        state.error = null
        state.loading = false
        state.popularPosts = null
        state.post = null
        state.status = action.payload.msg
      });
  },
});

export const {} = postSlice.actions;

export default postSlice.reducer;
