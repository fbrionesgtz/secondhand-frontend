import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: sessionStorage.getItem("token"),
  },
  reducers: {
    logIn(state, action) {
      state.token = sessionStorage.setItem("token", action.payload);
    },
    logOut() {
      sessionStorage.clear();
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
