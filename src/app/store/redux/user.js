import { createSlice } from "@reduxjs/toolkit";
import {
  changePassword,
  createUser,
  fetchUsers,
  forgetPassword,
  reactivateUser,
  resetPassword,
  suspendUser,
  verifyOtp,
} from "../service/user.service";
import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from "../common/common";
import { CreateGenericAsyncThunk } from "../common/ServiceHooks";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  users: null,
  email: null,
  user: null,
  hasMessage: "",
  hasError: "",
};

export const addUserReducer = CreateGenericAsyncThunk("user/add", createUser);
export const getAllUserReducer = CreateGenericAsyncThunk(
  "user/all",
  fetchUsers
);

export const filterAllUserReducer = CreateGenericAsyncThunk(
  "user/filter",
  fetchUsers
);
export const forgetPasswordReducer = CreateGenericAsyncThunk(
  "user/forgetPassword",
  forgetPassword
);
export const verifyOtpReducer = CreateGenericAsyncThunk(
  "user/verifyOtp",
  verifyOtp
);
export const resetPasswordReducer = CreateGenericAsyncThunk(
  "user/resetPassword",
  resetPassword
);
export const suspendUserReducer = CreateGenericAsyncThunk(
  "user/suspend",
  suspendUser
);
export const changeUserPasswordReducer = CreateGenericAsyncThunk(
  "user/changePassword",
  changePassword
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUserReducer.pending, handlePending)
      .addCase(addUserReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.users.unshift(action.payload.data);
        state.hasMessage = "User added successfully";
      })
      .addCase(addUserReducer.rejected, handleRejected)

      .addCase(getAllUserReducer.pending, handlePending)
      .addCase(getAllUserReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.users = action.payload.data || [];
        state.hasMessage = "Users fetched successfully";
      })
      .addCase(getAllUserReducer.rejected, (state, action) => {
        handleRejected(state, action);
      })

      .addCase(filterAllUserReducer.pending, handlePending)
      .addCase(filterAllUserReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.users = action.payload?.data || [];
      })
      .addCase(filterAllUserReducer.rejected, (state, action) => {
        handleRejected(state, action);
      })

      .addCase(forgetPasswordReducer.pending, handlePending)
      .addCase(forgetPasswordReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.user = action.payload || [];
        state.hasMessage = "Password reset request submitted successfully";
      })
      .addCase(forgetPasswordReducer.rejected, (state, action) => {
        handleRejected(state, action);
        state.hasError =
          action.error.message || "Error submitting password reset request";
      })

      .addCase(resetPasswordReducer.pending, handlePending)
      .addCase(resetPasswordReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.user = action.payload || [];
        state.isSuccess = true;
        state.hasMessage = "Password reset successful";
      })
      .addCase(resetPasswordReducer.rejected, (state, action) => {
        handleRejected(state, action);
        state.isSuccess = false;
        state.hasError = action.error.message || "Error resetting password";
      })

      .addCase(verifyOtpReducer.pending, handlePending)
      .addCase(verifyOtpReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.user = action.payload || [];
        state.hasMessage = "OTP verified successfully";
      })
      .addCase(verifyOtpReducer.rejected, (state, action) => {
        handleRejected(state, action);
        state.hasError = action.error.message || "Error verifying OTP";
      })
      .addCase(suspendUserReducer.pending, handlePending)
      .addCase(suspendUserReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.users = action.payload;
        state.hasMessage = "User suspended successfully";
      })
      .addCase(suspendUserReducer.rejected, (state, action) => {
        handleRejected(state, action);
        state.hasError = action.error.message || "Error suspending user";
      })

      .addCase(changeUserPasswordReducer.pending, handlePending)
      .addCase(changeUserPasswordReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.users = action.payload;
      })
      .addCase(changeUserPasswordReducer.rejected, handleRejected);
  },
});

export const isLoading = (state) => state.user.isLoading;
export const isError = (state) => state.user.isError;
export const isSuccess = (state) => state.user.isSuccess;
export const users = (state) => state.user.users;
export const hasMessage = (state) => state.user.hasMessage;
export const hasError = (state) => state.user.hasError;

const { reducer } = userSlice;
export default reducer;
