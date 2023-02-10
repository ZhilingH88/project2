import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { logOut, setCredentials } from "../../features/auth/authSlice";
import { userLogout } from "../../features/user/userSlice";
import { customFetch } from "../../utils/axios";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/",
  credentials: "include",
  prepareHeaders: async (headers, { getState }) => {
    const token = getState().auth.token;
    console.log("token", token);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  try {
    let result = await baseQuery(args, api, extraOptions);
    console.log("base", result);
    if (result?.error?.status === 403) {
      console.log("send refresh token");
      const refreshResult = await baseQuery("/users/token", api, extraOptions);
      if (refreshResult?.data) {
        const token = refreshResult.data.accessToken;
        const decoded = jwtDecode(token);
        api.dispatch(
          setCredentials({
            userEmail: decoded.userEmail,
            accessToken: refreshResult.data.accessToken,
            isAdmin: decoded.isAdmin,
          })
        );
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logOut());
      }
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Cart", "User"],
  endpoints: (builder) => ({}),
});
