
"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = "";
    },
  },
});

// Extract the actions and reducer from the slice
const { reducer, actions } = messageSlice;
export const { setMessage, clearMessage } = actions;
export default reducer;