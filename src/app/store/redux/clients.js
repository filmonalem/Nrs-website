import { createSlice } from "@reduxjs/toolkit";

import { CreateGenericAsyncThunk } from "../common/ServiceHooks";

import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from "../common/common";
import {
  addClient,
  detailClientCustomer,
  detailClientSupplier,
  fetchClients,
  fetchClientsCustomer,
  fetchClientsSupplier,
} from "../service/clients.service";

const initialState = {
  isLoading: false,
  isError: false,
  hasMessage: "",
  clients: null,
  customers: null,
  customer: null,
  suppliers: null,
  supplier: null,
  searchClients: null,
  filter: "",
  message: "",
  error: "",
};

export const addClientReducer = CreateGenericAsyncThunk(
  "client/create",
  addClient
);

export const getAllClientsReducer = CreateGenericAsyncThunk(
  "clients/list",
  fetchClients
);

export const filterClientsReducer = CreateGenericAsyncThunk(
  "clients/filter",
  fetchClients
);

export const getClientsCustomerReducer = CreateGenericAsyncThunk(
  "clients/customer",
  fetchClientsCustomer
);

export const filterClientsCustomerReducer = CreateGenericAsyncThunk(
  "clients/customer/filter",
  fetchClientsCustomer
);

export const getCustomerDetailReducer = CreateGenericAsyncThunk(
  "clients/customer/detail",
  detailClientCustomer
);

export const getSupplierDetailReducer = CreateGenericAsyncThunk(
  "clients/supplier/detail",
  detailClientSupplier
);

export const getClientsSupplierReducer = CreateGenericAsyncThunk(
  "clients/supplier",
  fetchClientsSupplier
);

export const filterClientsSupplierReducer = CreateGenericAsyncThunk(
  "clients/supplier/filter",
  fetchClientsSupplier
);

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addClientReducer.pending, handlePending)
      .addCase(addClientReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.clients.unshift(action.payload);
      })
      .addCase(addClientReducer.rejected, (state, action) => {
        handleRejected(state, action);
        state.message = action.payload.data.message;
      })

      .addCase(getAllClientsReducer.pending, handlePending)
      .addCase(getAllClientsReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.clients = action.payload.data || [];
      })
      .addCase(getAllClientsReducer.rejected, handleRejected)

      .addCase(filterClientsReducer.pending, handlePending)
      .addCase(filterClientsReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.clients = action.payload.data || [];
      })
      .addCase(filterClientsReducer.rejected, handleRejected)

      .addCase(getClientsCustomerReducer.pending, handlePending)
      .addCase(getClientsCustomerReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.customers = action.payload.data || [];
      })
      .addCase(getClientsCustomerReducer.rejected, handleRejected)

      .addCase(filterClientsCustomerReducer.pending, handlePending)
      .addCase(filterClientsCustomerReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.customers = action.payload.data || [];
      })
      .addCase(filterClientsCustomerReducer.rejected, handleRejected)

      .addCase(getCustomerDetailReducer.pending, handlePending)
      .addCase(getCustomerDetailReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.customer = action.payload || [];
      })
      .addCase(getCustomerDetailReducer.rejected, handleRejected)

      .addCase(getClientsSupplierReducer.pending, handlePending)
      .addCase(getClientsSupplierReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.suppliers = action.payload.data || [];
      })
      .addCase(getClientsSupplierReducer.rejected, handleRejected)

      .addCase(filterClientsSupplierReducer.pending, handlePending)
      .addCase(filterClientsSupplierReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.suppliers = action.payload.data || [];
      })
      .addCase(filterClientsSupplierReducer.rejected, handleRejected)

      .addCase(getSupplierDetailReducer.pending, handlePending)
      .addCase(getSupplierDetailReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.supplier = action.payload || [];
      })
      .addCase(getSupplierDetailReducer.rejected, handleRejected);
  },
});

export const isLoading = (state) => state.client.isLoading;
export const isError = (state) => state.client.isError;
export const hasMessage = (state) => state.client.hasMessage;
export const clients = (state) => state.client.clients;
export const customers = (state) => state.client.customers;
export const customer = (state) => state.client.customer;
export const suppliers = (state) => state.client.suppliers;
export const supplier = (state) => state.client.supplier;
export const filterClientInput = (state) => state.client.filter;

const { reducer } = clientSlice;
export default reducer;
