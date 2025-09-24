"use client";
import { ApiRequest } from "../common/ServiceHooks";

export const createTransaction = async (formData) => {
  return await ApiRequest("POST", "transactions", formData);
};

export const getAllTransactions = async (searchTerm = "") => {
  const url = `transactions?searchTerm=${encodeURIComponent(searchTerm)}`;
  return await ApiRequest("GET", url);
};

export const getOneTransaction = async (transactionId) => {
  const url = `transactions/${transactionId}`;
  return await ApiRequest("GET", url);
};