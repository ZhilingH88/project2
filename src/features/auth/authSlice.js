import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAdmin: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      const { userEmail, accessToken, isAdmin } = payload;
      state.user = userEmail;
      state.isAdmin = isAdmin;
      state.token = accessToken;
    },
    logOut: (state, { payload }) => {
      state.user = null;
      state.isAdmin = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUserIsAdmin = (state) => state.auth.isAdmin;
