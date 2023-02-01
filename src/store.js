import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./features/modal/modalSlice";
import userSlice from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    user: userSlice,
  },
});
