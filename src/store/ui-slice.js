import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showLearnMore: false,
    isSideBarShown: false,
    isCoverImageHover: false,
    isProfileImageHover: false,
    isUserContactShown: false,
    deletePrompt: false,
  },
  reducers: {
    showLearnMore(state) {
      state.showLearnMore = true;
    },
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
    showDeletePrompt(state) {
      state.deletePrompt = true;
    },
    hideDeletePrompt(state) {
      state.deletePrompt = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
