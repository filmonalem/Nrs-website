"use client";
import { ApiRequest } from "../common/ServiceHooks";

export const addCategory = async (name) =>
  await ApiRequest("POST", "categories", name);
export const fetchCategory = async () => await ApiRequest("GET", "categories");
export const filterCategory = async (searchTerm) => {
  const url = `categories/search?name=${searchTerm}`;
  return ApiRequest("GET", url, searchTerm);
};
