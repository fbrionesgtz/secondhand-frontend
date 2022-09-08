import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isLoggedIn: false,
  },
  reducers: {
    setToken(state, action) {
      localStorage.setItem("token", action.payload);
    },
    clearToken(state) {
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
