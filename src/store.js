import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./features/modal/modalSlice";
import userSlice from "./features/user/userSlice";
import { apiSlice } from "./app/api/apiSlice";
import authSlice from "./features/auth/authSlice";
import productSlice from "./features/products/productSlice";
import cartSlice from "./features/cart/cartSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    modal: modalSlice,
    user: userSlice,
    auth: authSlice,
    products: productSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: false,
});
