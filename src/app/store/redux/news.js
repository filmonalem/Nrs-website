import { createSlice } from "@reduxjs/toolkit";
import { CreateGenericAsyncThunk } from "../common/ServiceHooks";
import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from "../common/common";
import { addNews, deleteNews, getAllNews, getDetailNewsById } from "../service/news.service";



const initialState = {
  isLoading: false,
  isError: false,
  hasMessage: "",
  newsItems: [],
  news: null,
  filter: "",
  pagination: {},
};

// Thunks
export const addNewsReducer = CreateGenericAsyncThunk(
  "news/add",
  addNews
);

export const getAllNewsReducer = CreateGenericAsyncThunk(
  "news/list",
  getAllNews
);

export const getOneNewsReducer = CreateGenericAsyncThunk(
  "news/getOne",
  getDetailNewsById
);

export const deleteNewsReducer = CreateGenericAsyncThunk(
  "news/delete",
  deleteNews
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewsReducer.pending, handlePending)
      .addCase(addNewsReducer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.hasMessage = action.payload.message || "News added successfully";
        if (action.payload.data) {
          state.newsItems.unshift(action.payload.data);
        }
      })
      .addCase(addNewsReducer.rejected, (state, action) => {
        handleRejected(state, action);
        state.hasMessage = action.error.message || "Failed to add news";
      })

      .addCase(getAllNewsReducer.pending, handlePending)
      .addCase(getAllNewsReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.newsItems = action.payload?.data || [];
        state.pagination = action.payload?.pagination || {};
      })
      .addCase(getAllNewsReducer.rejected, handleRejected)

      .addCase(getOneNewsReducer.pending, handlePending)
      .addCase(getOneNewsReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.news = action.payload;
      })
      .addCase(getOneNewsReducer.rejected, handleRejected)

      .addCase(deleteNewsReducer.pending, handlePending)
      .addCase(deleteNewsReducer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.hasMessage = action.payload.message || "News deleted successfully";
        state.newsItems = state.newsItems.filter(
          (item) => item.id !== action.meta.arg
        );
        state.news = null;
      })
      .addCase(deleteNewsReducer.rejected, (state, action) => {
        handleRejected(state, action);
        state.hasMessage = action.error.message || "Failed to delete news";
      });
  },
});

export const selectNewsItems = (state) => state.news?.newsItems || [];
export const selectIsLoading = (state) => state.news?.isLoading || false;
export const selectIsError = (state) => state.news?.isError || false;
export const selectHasMessage = (state) => state.news?.hasMessage || "";
export const selectPagination = (state) => state.news?.pagination || {};
export const selectNews = (state) => state.news?.news || null;

const { reducer } = newsSlice;
export default reducer;