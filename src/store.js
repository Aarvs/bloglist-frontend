// import { createStore } from "redux";
import notificatoinReducer from "./reducers/notifyReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    blogs: notificatoinReducer,
  },
});

export default store;
