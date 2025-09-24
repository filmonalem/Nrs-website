import { createSlice } from "@reduxjs/toolkit";
import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from "../common/common";
import {
  addCategory,
  fetchCategory,
  filterCategory,
} from "../service/category.service";
import { CreateGenericAsyncThunk } from "../common/ServiceHooks";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: true,
  categories: [],
  category: null,
  hasMessage: "",
  hasError: "",
};

export const addCategoryReducer = CreateGenericAsyncThunk(
  "category/create",
  addCategory
);

export const getAllCategoryReducer = CreateGenericAsyncThunk(
  "category/list",
  fetchCategory
);

export const filterCategoryReducer = CreateGenericAsyncThunk(
  "category/filter",
  filterCategory
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCategoryReducer.pending, handlePending)
      .addCase(addCategoryReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.categories.unshift(action.payload);
      })
      .addCase(addCategoryReducer.rejected, handleRejected)

      .addCase(getAllCategoryReducer.pending, handlePending)
      .addCase(getAllCategoryReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.categories = action.payload?.data || [];
      })
      .addCase(getAllCategoryReducer.rejected, handleRejected)

      .addCase(filterCategoryReducer.pending, handlePending)
      .addCase(filterCategoryReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.categories = action.payload || [];
      })
      .addCase(filterCategoryReducer.rejected, handleRejected);
  },
});

export const isLoading = (state) => state.category.isLoading;
export const isError = (state) => state.category.isError;
export const isSuccess = (state) => state.category.isSuccess;
export const categories = (state) => state.category.categories;
export const hasMessage = (state) => state.category.hasMessage;
export const hasError = (state) => state.category.hasError;

const { reducer } = categorySlice;
export default reducer;
