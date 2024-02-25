import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";

const initialState = [
  JSON.parse(window.localStorage.getItem("loggedBlogappUser")),
];

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userDetails: (state, action) => {
      return state.concat(action.payload);
    },
  },
});

export const loggedUser = (userName, password) => {
  return async (dispatch) => {
    const loggedInUser = await loginService.login({ userName, password });
    console.log(typeof loggedInUser);
    blogService.setToken(loggedInUser.token);
    window.localStorage.setItem(
      "loggedBlogappUser",
      JSON.stringify(loggedInUser)
    );

    dispatch(userDetails(loggedInUser));
  };
};

export const { userDetails } = userSlice.actions;

export default userSlice.reducer;
