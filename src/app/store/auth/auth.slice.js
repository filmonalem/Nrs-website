"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../../api/ApiInitial";

// ✅ Save login data
const saveToLocalStorage = ({ user, email, token, role, userId }) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", user);
    localStorage.setItem("email", email);
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", userId);
  }
};

// ✅ Clear data on logout
export const clearLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
};

// ✅ Initial Auth State
export const getInitialState = () => ({
  loading: false,
  user: typeof window !== "undefined" ? localStorage.getItem("user") || null : null,
  email: typeof window !== "undefined" ? localStorage.getItem("email") || null : null,
  role: typeof window !== "undefined" ? localStorage.getItem("role") || null : null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") || null : null,
  userId: typeof window !== "undefined" ? localStorage.getItem("userId") || null : null,
  auth: typeof window !== "undefined" && localStorage.getItem("token") ? true : false,
  message: null,
});

// ✅ Login
export const submitLogin = async (formData, messageApi, router) => {
  const state = getInitialState(); 
  try {
    state.loading = true;
    const response = await API.post("/auth/login", formData);
    const { accessToken, user } = response.data;

    if (accessToken) {
      const { role, fullName, email, userId } = user;
      saveToLocalStorage({
        user: fullName,
        email,
        token: accessToken,
        role,
        userId,
      });

      const newState = {
        ...state,
        loading: false,
        auth: true,
        user: fullName,
        email,
        token: accessToken,
        role,
        userId,
        message: "Login successful",
      };

      messageApi.success("Login successful");
      router.push("/home/dashboard");
      return newState;
    }
  } catch (error) {
    let errorMessage = "An unexpected error occurred. Please try again.";
    if (!error.response) {
      errorMessage = "Connection error. Please check your network and try again.";
    } else if (error.response.status === 401 || error.response.status === 404) {
      errorMessage = "Email or password is not valid or not found";
    }
    messageApi.error(errorMessage);
    return { ...state, loading: false, message: errorMessage };
  }
};

export const logout = async (router) => {
  clearLocalStorage();
  router.push("/");
};

export const getCurrentUser = () =>
  typeof window !== "undefined" ? localStorage.getItem("user") || null : null;
export const getCurrentEmail = () =>
  typeof window !== "undefined" ? localStorage.getItem("email") || null : null;
export const getCurrentRole = () =>
  typeof window !== "undefined" ? localStorage.getItem("role") || null : null;
export const getCurrentToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("token") || null : null;
export const getCurrentUserId = () =>
  typeof window !== "undefined" ? localStorage.getItem("userId") || null : null;

export const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = getCurrentToken();
    if (!token) {
      router.push("/login"); 
    } else {
      setChecking(false);
    }
  }, [router]);

  if (checking) {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  return children;
};
