import { ApiRequest } from "../common/ServiceHooks";

export const addProperty = async (formData) => {
  console.log("Sending FormData to addProperty:");
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value instanceof File ? `${value.name} (${value.type})` : value);
  }
  try {
    const response = await ApiRequest("POST", "properties", formData);
    return response;
  } catch (error) {
    const errorData = error.message ? error : { message: error.message || "Failed to add property" };
    console.error("Add property error:", errorData);
    throw errorData;
  }
};

export const fetchProperties = async ({
  page = 1,
  limit = 10,
  searchTerm = "",
  minPrice,
  maxPrice,
  location,
  type,
  category,
}) => {
  const query = new URLSearchParams();

  // Add only if numeric
  if (!isNaN(page)) query.append("page", page.toString());
  if (!isNaN(limit)) query.append("limit", limit.toString());
  if (!isNaN(minPrice)) query.append("minPrice", minPrice.toString());
  if (!isNaN(maxPrice)) query.append("maxPrice", maxPrice.toString());

  // Optional string filters
  if (searchTerm) query.append("searchTerm", searchTerm);
  if (location) query.append("location", location);
  if (type) query.append("type", type);
  if (category) query.append("category", category);

  return ApiRequest("GET", `properties?${query.toString()}`);
};

export const getAllProperties = async () => {
  return ApiRequest("GET", "properties");
};

export const getDetailPropertyById = async (propertyId) => {
  const url = `properties/${propertyId}`;
  return await ApiRequest("GET", url, propertyId);
};

export const fetchRemainProperty = async (propertyId) => {
  const url = `sales/remain/${propertyId}`;
  return ApiRequest("GET", url, propertyId);
};

export const updateProperty = async (formData) => {
  const url = `properties/${formData.propertyId}`;
  return ApiRequest("PUT", url, formData);
};

export const updatePropertyPrice = async (formData) => {
  const url = `prices/${formData.propertyId}`;
  return ApiRequest("POST", url, formData);
};

export const getProfitProperties = async () => {
  return ApiRequest("GET", "properties/financial/profit");
};
export const getPropertyReducer = async () => {
  return ApiRequest("GET", "properties/total");
};