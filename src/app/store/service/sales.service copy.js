"use client";
import { ApiRequest } from "../common/ServiceHooks";

export const addSales = async (formData) =>
  await ApiRequest("POST", "sales", formData);

export const fetchSales = async (data) => {
  var url = "";
  if (data?.invoiceNo !== undefined) {
    url = `sales?page=${data?.page}&invoiceNo=${data?.invoiceNo}`;
  } else if (data?.startDate && data?.endDate) {
    url = `sales?startDate=${data?.startDate}&endDate=${data?.endDate}`;
  } else {
    url = `sales?page=${data?.page}`;
  }
  return ApiRequest("GET", url, (data = data));
};

export const getDailySales = async (page) => {
  const url = `sales/daily?page=${page}`;
  return ApiRequest("GET", url, (page = page));
};

export const reportAllSale = async (data) => {
  let url = "sales/report?";

  if (data?.start && data?.end) {
    url += `start=${encodeURIComponent(data.start)}&end=${encodeURIComponent(data.end)}&`;
  }

  if (data?.referenceNo) {
    url += `referenceNo=${encodeURIComponent(data.referenceNo)}&`;
  }

  if (data?.fullName) {
    url += `fullName=${encodeURIComponent(data.fullName)}&`;
  }

  if (data?.phone) {
    url += `phone=${encodeURIComponent(data.phone)}&`;
  }

  if (data?.productName) {
    url += `productName=${encodeURIComponent(data.productName)}&`;
  }
  if (data?.isPaid) {
    url += `isPaid=${encodeURIComponent(data.isPaid)}&`;
  }

  url = url.endsWith("&") ? url.slice(0, -1) : url;

  return ApiRequest("GET", url, data);
};

export const getCreditSales = async (data) => {
  const url = `sales/credit?page=${data?.page}&limit=${data?.pageSize}&startDate=${data?.startDate}&endDate=${data?.endDate}&invoiceNo=${data?.searchTerm}`;
  return ApiRequest("GET", url, (data = data));
};

export const getSeasonalSales = async (data) => {
  const url = `sales/seasonal?startDate=${data.startDate}&endDate=${data.endDate}`;
  return ApiRequest("GET", url, data);
};
