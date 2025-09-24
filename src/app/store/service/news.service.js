import { ApiRequest } from "../common/ServiceHooks";

export const addNews = async (formData) => {
  console.log("Sending FormData to addNews:");
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value instanceof File ? `${value.name} (${value.type})` : value);
  }
  try {
    const response = await ApiRequest("POST", "news", formData);
    return response;
  } catch (error) {
    const errorData = error.message ? error : { message: error.message || "Failed to add news" };
    console.error("Add news error:", errorData);
    throw errorData;
  }
};

export const getAllNews = async ({ page = 1, limit = 10, searchTerm = "" } = {}) => {
  const query = new URLSearchParams({
    page,
    limit,
    ...(searchTerm && { searchTerm }),
  }).toString();
  try {
    const response = await ApiRequest("GET", `news?${query}`);
    return response;
  } catch (error) {
    const errorData = error.message ? error : { message: error.message || "Failed to fetch news" };
    console.error("Get all news error:", errorData);
    throw errorData;
  }
};

export const getDetailNewsById = async (newsId) => {
  const url = `news/${newsId}`;
  try {
    const response = await ApiRequest("GET", url, newsId);
    return response;
  } catch (error) {
    const errorData = error.message ? error : { message: error.message || "Failed to fetch news details" };
    console.error("Get news details error:", errorData);
    throw errorData;
  }
};

export const deleteNews = async (newsId) => {
  const url = `news/${newsId}`;
  try {
    const response = await ApiRequest("DELETE", url, newsId);
    return response;
  } catch (error) {
    const errorData = error.message ? error : { message: error.message || "Failed to delete news" };
    console.error("Delete news error:", errorData);
    throw errorData;
  }
};