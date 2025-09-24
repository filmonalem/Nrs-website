"use client";
import { ApiRequest } from "@/app/store/common/ServiceHooks";
import { setMessage } from "@/app/store/redux/message";
import useSWR from "swr";

export const useFetcher = (url, options = {}) => {
  const { data, error } = useSWR(url, fetcher, options);

  const isLoading = !data && !error;

  return {
    data,
    error,
    isLoading,
  };
};

export const fetcher = async (method, url, data) => {
  try {
    const response = await ApiRequest(method, url, data);
    return response;
  } catch (error) {
    return setMessage(error.message || "Failed to fetch data");
  }
};

export const callFetcher = (method, url, data = null, options = {}) => {
  const fetcher = async (url) => {
    try {
      const response = await ApiRequest(method, url, data);
      return response;
    } catch (error) {
      return setMessage(error.message || "Failed to fetch data");
    }
  };

  const { data: result, error } = useSWR(url, fetcher, options);

  const isLoading = !result && !error;

  return {
    data: result,
    error,
    isLoading,
  };
};
