import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAdmin: null,
  isLoading: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      const { userEmail, isLoading, isAdmin } = payload;
      state.user = userEmail;
      state.isAdmin = isAdmin;
      state.isLoading = isLoading;
    },
    logOut: (state) => {
      state.user = null;
      state.isAdmin = null;
    },
  },
});

export const { setCredentials, logOut, setUserLogin } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUserIsAdmin = (state) => state.auth.isAdmin;
