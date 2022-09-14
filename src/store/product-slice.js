import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    reloadProducts: false,
    search: "",
    filters: {
      priceRange: {
        min: null,
        max: null,
      },
      categories: [],
    },
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
    addFilter(state, action) {
      let category = action.payload.category;
      let minPrice = action.payload.min;
      let maxPrice = action.payload.max;

      if (minPrice && minPrice > 0) {
        state.filters.priceRange.min = minPrice;
      } else if (minPrice <= 0) {
        state.filters.priceRange.min = null;
      }

      if (maxPrice && maxPrice >= 0) {
        state.filters.priceRange.max = maxPrice;
      } else if (maxPrice <= 0 || maxPrice < minPrice) {
        state.filters.priceRange.max = null;
      }

      if (category && !state.filters.categories.includes(category)) {
        state.filters.categories = [...state.filters.categories, category];
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
        priceRange: {
          min: null,
          max: null,
        },
        categories: [],
      };
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
