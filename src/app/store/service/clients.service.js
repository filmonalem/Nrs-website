"use client";
import { ApiRequest } from "../common/ServiceHooks";

export const addClient = async (formData) =>
  await ApiRequest("POST", "clients", formData);

export const fetchClients = async (data) => {
  const url = `clients?searchTerm=${data}`;
  return await ApiRequest("GET", url, data);
};
export const fetchClientsCustomer = async (data) => {
  const url = `clients/customer?searchTerm=${data}`;
  return await ApiRequest("GET", url, data);
};

export const fetchClientsSupplier = async (data) => {
  const url = `clients/supplier?searchTerm=${data}`;
  return await ApiRequest("GET", url, data);
};
export const detailClientCustomer = async (data) => {
  const url = `sales/client/${data}`;
  return await ApiRequest("GET", url, data);
};

export const detailClientSupplier = async (data) => {
  const url = `properties/owner/${data}`;
  return await ApiRequest("GET", url, data);
};
