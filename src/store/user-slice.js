import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    userProducts: [],
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setUserProducts(state, action) {
      state.userProducts = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
