import { clearLocalStorage } from "../app/store/auth/auth.slice";
import Axios from "axios";

export const BASEURL = "http://localhost:3004/api/v1";

const API = Axios.create({
  baseURL: BASEURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      config.transformRequest = [(data) => data];
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      clearLocalStorage();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export const uploadFile = async (url, files, config = {}) => {
  const formData = new FormData();
  if (Array.isArray(files)) {
    files.forEach((file, index) => {
      formData.append("files", file);
    });
  } else {
    formData.append("files", files);
  }

  return API.post(url, formData, {
    headers: {
      ...config.headers,
      "Content-Type": "multipart/form-data",
    },
    ...config,
  });
};

export default API;