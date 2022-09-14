import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    reloadProducts: false,
    search: "",
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    reloadProducts(state) {
      state.reloadProducts = !state.reloadProducts;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
