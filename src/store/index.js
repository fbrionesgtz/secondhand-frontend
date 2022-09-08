import authSlice from "./auth-slice";
import uiSlice from "./ui-slice";
import productSlice from "./product-slice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    product: productSlice,
  },
});

export default store;
