import { createSlice } from "@reduxjs/toolkit";
import { CreateGenericAsyncThunk } from "../common/ServiceHooks";
import {
  getClientsCustomer,
  getClientsSupplier,
  getPropertyTotal,
  getSalesMonthly,
  getSalesWeekly,
  getSalesYearly,
  getStockMonthly,
  getStockWeekly,
  getStockYearly,
  getStorage,
} from "../service/dashboard.service";
import { handleFulfilled, handlePending, handleRejected } from "../common/common";

const initialState = {
  isLoading: false,
  isError: false,
  hasMessage: "",
  storage: {
    cpu: 0,
    size: 0,
    diskIO: 0,
    network: 0,
    lastUpdate: null,
  },
  suppliers: null,
  customers: null,
  property: null, 
  weeklyStocks: null,
  monthlyStocks: null,
  yearlyStocks: null,
  weeklySales: null,
  monthlySales: null,
  yearlySales: null,
  message: "",
  pagination: null,
};

// Stock Reducers
export const getStockWeeklyReducer = CreateGenericAsyncThunk("stock/weekly", getStockWeekly);
export const getStockMonthlyReducer = CreateGenericAsyncThunk("stock/monthly", getStockMonthly);
export const getStockYearlyReducer = CreateGenericAsyncThunk("stock/yearly", getStockYearly);

// Sales Reducers
export const getSalesWeeklyReducer = CreateGenericAsyncThunk("sales/weekly", getSalesWeekly);
export const getSalesMonthlyReducer = CreateGenericAsyncThunk("sales/monthly", getSalesMonthly);
export const getSalesYearlyReducer = CreateGenericAsyncThunk("sales/yearly", getSalesYearly);
export const getClientsSupplierReducer = CreateGenericAsyncThunk("clients/supplier", getClientsSupplier);
export const getClientsCustomerReducer = CreateGenericAsyncThunk("clients/customer", getClientsCustomer);
export const getStorageReducer = CreateGenericAsyncThunk("storage/size", getStorage);
export const getPropertyTotalReducer = CreateGenericAsyncThunk("property/total", getPropertyTotal);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  extraReducers: (builder) => {
    builder
      // Weekly Stock
      .addCase(getStockWeeklyReducer.rejected, handleRejected)
      .addCase(getStockWeeklyReducer.pending, handlePending)
      .addCase(getStockWeeklyReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.weeklyStocks = action.payload || [];
      })
      // Monthly Stock
      .addCase(getStockMonthlyReducer.rejected, handleRejected)
      .addCase(getStockMonthlyReducer.pending, handlePending)
      .addCase(getStockMonthlyReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.monthlyStocks = action.payload || [];
      })
      // Yearly Stock
      .addCase(getStockYearlyReducer.rejected, handleRejected)
      .addCase(getStockYearlyReducer.pending, handlePending)
      .addCase(getStockYearlyReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.yearlyStocks = action.payload || [];
      })
      // Weekly Sales
      .addCase(getSalesWeeklyReducer.rejected, handleRejected)
      .addCase(getSalesWeeklyReducer.pending, handlePending)
      .addCase(getSalesWeeklyReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.weeklySales = action.payload || [];
      })
      // Monthly Sales
      .addCase(getSalesMonthlyReducer.rejected, handleRejected)
      .addCase(getSalesMonthlyReducer.pending, handlePending)
      .addCase(getSalesMonthlyReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);

  state.monthlySales = action.payload?.data || action.payload || [];      })
      // Yearly Sales
      .addCase(getSalesYearlyReducer.rejected, handleRejected)
      .addCase(getSalesYearlyReducer.pending, handlePending)
      .addCase(getSalesYearlyReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);

  state.yearlySales = action.payload?.data || action.payload || [];      })
      // Suppliers
      .addCase(getClientsSupplierReducer.rejected, handleRejected)
      .addCase(getClientsSupplierReducer.pending, handlePending)
      .addCase(getClientsSupplierReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.suppliers = action.payload?.data || [];
      })
      // Property
      .addCase(getPropertyTotalReducer.rejected, handleRejected)
      .addCase(getPropertyTotalReducer.pending, handlePending)
      .addCase(getPropertyTotalReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        console.log("getPropertyTotalReducer payload:", action.payload); 
        state.property = action.payload || [];
      })
      // Customers
      .addCase(getClientsCustomerReducer.rejected, handleRejected)
      .addCase(getClientsCustomerReducer.pending, handlePending)
      .addCase(getClientsCustomerReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.customers = action.payload?.data || [];
      })
      // Storage
      .addCase(getStorageReducer.rejected, handleRejected)
      .addCase(getStorageReducer.pending, handlePending)
      .addCase(getStorageReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.storage = action.payload?.data || [];
      });
  },
});

// Selectors
export const isLoading = (state) => state.dashboard.isLoading;
export const isError = (state) => state.dashboard.isError;
export const hasMessage = (state) => state.dashboard.hasMessage;
export const suppliers = (state) => state.dashboard.suppliers;
export const customers = (state) => state.dashboard.customers;
export const storage = (state) => state.dashboard.storage;
export const property = (state) => state.dashboard.property; 

export const weeklySales = (state) => state.dashboard.weeklySales || [];
export const monthlySales = (state) => state.dashboard.monthlySales || [];
export const yearlySales = (state) => state.dashboard.yearlySales || [];
export const weeklyStocks = (state) => state.dashboard.weeklyStocks || [];
export const monthlyStocks = (state) => state.dashboard.monthlyStocks || [];
export const yearlyStocks = (state) => state.dashboard.yearlyStocks || [];

export default dashboardSlice.reducer;