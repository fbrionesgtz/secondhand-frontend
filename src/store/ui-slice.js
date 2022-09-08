import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isSideBarShown: true,
  },
  reducers: {
    showSideBar(state) {
      state.isSideBarShown = true;
    },
    hideSideBar(state) {
      state.isSideBarShown = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
