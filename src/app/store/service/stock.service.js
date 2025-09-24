"use client";
import { ApiRequest } from "../common/ServiceHooks";

export const addStock = async (formData) =>
  await ApiRequest("POST", "stock", formData);

export const fetchStocks = async (data) => {
  var url = "";
  if(data?.invoiceNo !== undefined){
     url = `stock?page=${data?.page}&invoiceNo=${data?.invoiceNo}`;
  }else if(data?.startDate && data?.endDate){
     url = `stock?startDate=${data?.startDate}&endDate=${data?.endDate}`;
  } else{
     url = `stock?page=${data?.page}`;
  }
  return ApiRequest("GET", url, (data = data));
};

export const reportStocks = async (data) => {
  const url = `stock?page=${data?.page}&limit=${data?.pageSize}&startDate=${data?.startDate}&endDate=${data?.endDate}&invoiceNo=${data?.searchTerm}`;
  return ApiRequest("GET", url, (data = data));
};


export const dailyStocks = async (data) => {
  const url = `stock/daily?searchTerm=${data}`;
  return ApiRequest("GET", url, (data = data));
};

export const fetchStock = async (id) => {
  const url = `stock/${id}`;
  return ApiRequest("GET", url, (data = data));
};

export const getCreditStocks = async (page) => {
  const url = `stock/credit?page=${page}`;
  return ApiRequest("GET", url, (page = page));
};

export const expireDate = async (data) => {
  const url = `stock/expiry?searchTerm=${data}`;
  return ApiRequest("GET", url, (data = data));
};
export const belowStock = async (data) => {
  const url = `stock/below?searchTerm=${data}`;
  return ApiRequest("GET", url, (data = data));
};
