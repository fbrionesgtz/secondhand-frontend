import { createSlice } from "@reduxjs/toolkit";

const convoSlice = createSlice({
  name: "convo",
  initialState: {
    convo: [],
    convoList: [],
    allConvoList: [],
    searchConvoList: "",
  },
  reducers: {
    setConvo(state, action) {
      state.convo = action.payload;
    },
    addMessage(state, action) {
      state.convo.push(action.payload);
    },
    clearConvo(state) {
      state.convo = [];
    },
    setConvoList(state, action) {
      state.convoList = action.payload;
    },
    addToConvoList(state, action) {
      state.convoList.push(action.payload);
    },
    sortConvoList(state, action) {
      state.convoList.sort((a, b) => {
        return a._id.toString() == action.payload
          ? -1
          : b._id.toString() == action.payload
          ? 1
          : 0;
      });
    },
    setAllConvoList(state, action) {
      state.allConvoList = action.payload;
    },
    setSearchConvoList(state, action) {
      state.searchConvoList = action.payload;
    },
  },
});

export const convoActions = convoSlice.actions;
export default convoSlice.reducer;
