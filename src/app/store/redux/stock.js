import { createSlice } from "@reduxjs/toolkit";
import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from "../common/common";
import { CreateGenericAsyncThunk } from "../common/ServiceHooks";
import {
  addStock,
  belowStock,
  dailyStocks,
  expireDate,
  fetchStocks,
  getCreditStocks,
} from "../service/stock.service";

const initialState = {
  isLoading: false,
  isError: false,
  hasMessage: "",
  stocks: [],
  stock: null,
  activeStocks: null,
  inactiveStocks: null,
  searchStocks: null,
  filter: "",
  message: "",
  pagination: {
    total: 0,
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
};

export const addStockReducer = CreateGenericAsyncThunk(
  "stock/create",
  addStock
);
export const getAllStockReducer = CreateGenericAsyncThunk(
  "stock/list",
  fetchStocks
);
export const getDailyStockReducer = CreateGenericAsyncThunk(
  "stock/daily",
  dailyStocks
);
export const getStockExpiryReducer = CreateGenericAsyncThunk(
  "stock/expiry",
  expireDate
);

export const creditStocksReducer = CreateGenericAsyncThunk(
  "sale/credit",
  getCreditStocks
);

export const getBelowStockReducer = CreateGenericAsyncThunk(
  "stock/below",
  belowStock
);
export const filteredStocksReducer = CreateGenericAsyncThunk(
  "stock/filter",
  fetchStocks
);
const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addStockReducer.pending, handlePending)
      .addCase(addStockReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.stocks = action.payload?.data || [];
      })
      .addCase(addStockReducer.rejected, handleRejected)

      .addCase(getAllStockReducer.pending, handlePending)
      .addCase(getAllStockReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.stocks = action.payload?.data?.data;
        state.pagination = action.payload?.data?.pagination || {
          total: 0,
          currentPage: 1,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        };
      })
      .addCase(getAllStockReducer.rejected, handleRejected)
      .addCase(getDailyStockReducer.pending, handlePending)
      .addCase(getDailyStockReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.stocks = action.payload?.data;
      })
      .addCase(getDailyStockReducer.rejected, handleRejected)

      .addCase(getStockExpiryReducer.pending, handlePending)
      .addCase(getStockExpiryReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.stocks = action.payload?.data;
      })

      .addCase(getStockExpiryReducer.rejected, handleRejected)

      .addCase(getBelowStockReducer.pending, handlePending)
      .addCase(getBelowStockReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.stocks = action.payload?.data?.data || [];
      })
      .addCase(getBelowStockReducer.rejected, handleRejected)

      .addCase(filteredStocksReducer.pending, handlePending)
      .addCase(filteredStocksReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.stocks = action.payload?.data?.data || [];
      })
      .addCase(filteredStocksReducer.rejected, handleRejected)

      .addCase(creditStocksReducer.pending, handlePending)
      .addCase(creditStocksReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.stocks = action.payload?.data?.data;
      })
      .addCase(creditStocksReducer.rejected, handleRejected);
  },
});

export const isLoading = (state) => state.stock.isLoading;
export const isError = (state) => state.stock.isError;
export const hasMessage = (state) => state.stock.hasMessage;
export const stocks = (state) => state.stock.stocks;
export const stock = (state) => state.stock.stock;
export const pagination = (state) => state.stock.pagination;
const { reducer } = stockSlice;
export default reducer;
