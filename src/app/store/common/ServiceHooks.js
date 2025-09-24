import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../redux/message";
import API, { BASEURL } from "../../../api/ApiInitial";

export const CreateGenericAsyncThunk = (type, asyncFunc) => {
  return createAsyncThunk(type, async (formData, thunkAPI) => {
    try {
      const result = await asyncFunc(formData);
      return result.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.result.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  });
};

export const ApiRequest = async (method, url, data = []) => {
  try {
    const config = {
      method: method,
      url,
      data: data,
    };
    const response = await API(config);
    return response;
  } catch (error) {
    throw error;
  }
};
