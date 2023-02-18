import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut } from "../../features/auth/authSlice";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
} from "../../utils/localStorage";
import { toast } from "react-toastify";
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/",
  credentials: "include",
  prepareHeaders: async (headers, { getState }) => {
    const token = getUserFromLocalStorage("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  try {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 403) {
      const refreshResult = await baseQuery("/user/token", api, extraOptions);
      if (refreshResult?.data) {
        const token = refreshResult.data.accessToken;
        addUserToLocalStorage("token", token);
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logOut());
      }
    }
    return result;
  } catch (error) {
    toast.error(error.data.message);
  }
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({}),
});
