import { createSlice } from "@reduxjs/toolkit";

const initialState = "intial State";

const notificatoinSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return action.payload;
    },
    removeNotification: (state, action) => {
      return null;
    },
  },
});

export const addNotification = (text, durationInSeconds) => {
  return async (dispatch) => {
    dispatch(setNotification(text));

    setTimeout(() => {
      dispatch(removeNotification());
    }, durationInSeconds * 1000);
  };
};

export const { setNotification, removeNotification } =
  notificatoinSlice.actions;

export default notificatoinSlice.reducer;
