import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    userProducts: [],
    userConvos: [],
    search: "",
    filters: {
      categories: [],
    },
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = {};
      state.userProducts = [];
    },
    setUserProducts(state, action) {
      state.userProducts = action.payload;
    },
    addUserProduct(state, action) {
      state.userProducts.push(action.payload);
    },
    setUserConvos(state, action) {
      state.userConvos = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    addFilter(state, action) {
      if (
        action.payload.category &&
        !state.filters.categories.includes(action.payload.category)
      ) {
        state.filters.categories = [
          ...state.filters.categories,
          action.payload.category,
        ];
      }
    },
    clearFilter(state, action) {
      if (action.payload.category) {
        state.filters.categories = state.filters.categories.filter(
          (category) => category !== action.payload.category
        );
      }
    },
    clearAllFilters(state) {
      state.filters = {
        categories: [],
      };
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
