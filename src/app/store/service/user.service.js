"use client";

import { ApiRequest } from "../common/ServiceHooks";

export const createUser = async (formData) => {
  return await ApiRequest("POST", "auth/signup", formData);
};

export const fetchUsers = async () => {
  return await ApiRequest("GET", "users", {});
};

export const forgetPassword = async (email) => {
  return await ApiRequest("POST", "auth/forgotPassword", email);
};

export const verifyOtp = async (otp) => {
  return await ApiRequest("POST", "auth/verify-otp", otp);
};

export const resetPassword = async (payload) => {
  return await ApiRequest("POST", "auth/reset-password", payload);
};
export const suspendUser = async (userId) => {
  const url = `auth/suspend/${userId}`;
  return await ApiRequest("PUT", url, userId);
};
export const changePassword = async (payload) => {
  return await ApiRequest("PUT", "auth/change-password", payload);
};
