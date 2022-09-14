import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isSideBarShown: false,
    isCoverImageHover: false,
    isProfileImageHover: false,
    isUserContactShown: false,
  },
  reducers: {
    showSideBar(state) {
      state.isSideBarShown = true;
    },
    hideSideBar(state) {
      state.isSideBarShown = false;
    },
    hoverCoverImage(state) {
      state.isCoverImageHover = true;
    },
    hoverLeaveCoverImage(state) {
      state.isCoverImageHover = false;
    },
    hoverProfileImage(state) {
      state.isProfileImageHover = true;
    },
    hoverLeaveProfileImage(state) {
      state.isProfileImageHover = false;
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
