import authSlice from "./auth-slice";
import uiSlice from "./ui-slice";
import userSlice from "./user-slice";
import productSlice from "./product-slice";
import convoSlice from "./convo-slice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    product: productSlice,
    ui: uiSlice,
    convo: convoSlice,
  },
});

export default store;
