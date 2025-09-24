"use client";
import { ApiRequest } from "../common/ServiceHooks";

export const addProduct = async (formData) =>
  await ApiRequest("POST", "products", formData);

export const fetchProducts = async (data) => {
  const url = `products?searchTerm=${data}`;
  return ApiRequest("GET", url, (data = data));
};

export const getAllProducts = async () => {
  return ApiRequest("GET", "products");
};

export const getDetailProductById = async (productId) => {
  const url = `products/review/${productId}`;
  return await ApiRequest("GET", url, productId);
};

export const fetchRemainProduct = async (productId) => {
  const url = `products/report/remain?searchTerm =${productId}`;
  const res = ApiRequest("GET", url, productId);
  return res;
};

export const updateProduct = async (formData) => {
  const url = `products/${formData.productId}`;
  return ApiRequest("PUT", url, formData);
};

export const updateProductPrice = async (formData) => {
  const url = `prices/${formData.productId}`;
  return ApiRequest("POST", url, formData);
};

export const getProfitProducts = async () => {
  return ApiRequest("GET", "products/financial/profit");
};
