import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const initialState = [];

const userSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    usersInfo: (state, action) => {
      return action.payload;
    },
  },
});

export const usersDetails = () => {
  return async (dispatch) => {
    const users = await userService.getUsers();
    console.log(users);
    dispatch(usersInfo(users));
  };
};

export const { usersInfo } = userSlice.actions;

export default userSlice.reducer;
