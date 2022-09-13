import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: sessionStorage.getItem("token"),
  },
  reducers: {
    logIn(state, action) {
      sessionStorage.setItem("token", action.payload);
    },
    logOut(state) {
      sessionStorage.clear();
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
