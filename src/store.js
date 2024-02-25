// import { createStore } from "redux";
import notificationReducer from "./reducers/notifyReducer";
import blogsReducer from "./reducers/blogsReducer";
import loggedInReducer from "./reducers/loggedInReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    blogs: notificationReducer,
    posts: blogsReducer,
    user: loggedInReducer,
  },
});

export default store;
