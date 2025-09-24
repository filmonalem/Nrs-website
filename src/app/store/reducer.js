"use client";
import { combineReducers } from "redux";
import messageSlice from "./redux/message";
import categorySlice from "./redux/category";
import clientSlice from "./redux/clients";
import userSlice from "./redux/user";
import dashboardSlice from "./redux/dashboard";
import contactSlice from "./redux/contact"
import newsSlice from "./redux/news"
const rootReducer = combineReducers({
  message: messageSlice,
  news: newsSlice,
  category: categorySlice,
  contact: contactSlice,
  client: clientSlice,
  user: userSlice,
  dashboard: dashboardSlice,

});

export default rootReducer;
