import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    userProducts: [],
    search: "",
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setUserProducts(state, action) {
      state.userProducts = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
