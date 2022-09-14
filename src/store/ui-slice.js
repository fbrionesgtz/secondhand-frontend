import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isSideBarShown: true,
    isUserContactShown: false,
  },
  reducers: {
    showSideBar(state) {
      state.isSideBarShown = true;
    },
    hideSideBar(state) {
      state.isSideBarShown = false;
    },
    showUserContact(state) {
      state.isUserContactShown = true;
    },
    hideUserContact(state) {
      state.isUserContactShown = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
