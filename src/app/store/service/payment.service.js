"use client";
import { ApiRequest } from "../common/ServiceHooks";

export const payCreditPayment = async (formData) =>
  await ApiRequest("POST", "payment", formData);

export const fetchAllPayments = async (data) => {
  var url = "";
  if(data?.invoiceNo !== undefined){
     url = `payments?page=${data?.page}&invoiceNo=${data?.invoiceNo}`;
  }else if(data?.startDate && data?.endDate){
     url = `payments?startDate=${data?.startDate}&endDate=${data?.endDate}`;
  } else if(data?.fullName || data?.phone){
     url = `payments?fullName=${data?.fullName}&phone=${data?.phone}`;
  } else{
     url = `payments?page=${data?.page}`;
  }
  return ApiRequest("GET", url, (data = data));
};

export const fetchDailyAllPayments = async () => {
  const url = `payments/daily`;
  return ApiRequest("GET", url);
};

export const paySaleCreditPayment = async ({ paymentId, paidAmount }) => {
  const url = `payments/sale/credit/${paymentId}`;
  return await ApiRequest("PUT", url, { paidAmount });
};


export const reportAllPayments = async (data) => {
  let url = "payments/report/?";
  if (data?.startDate && data?.endDate) {
    url += `startDate=${data.startDate}&endDate=${data.endDate}&`;
  }
  if (data?.invoiceNo) {
    url += `invoiceNo=${data.invoiceNo}&`;
  }
  url += `reason=${data?.reason}`;
  
  return ApiRequest("GET", url);
};


export const getCreditPayments = async (data) => {
  let url = "payments/credit";
  if (data?.invoiceNo) {
    url += `/?invoiceNo=${data.invoiceNo}`;
  }else if(data?.fullName || data?.phone){
    url += `/?fullName=${data?.fullName}&phone=${data?.phone}`;
  }else{
    url;
  }
  return ApiRequest("GET", url, (data = data));
};

