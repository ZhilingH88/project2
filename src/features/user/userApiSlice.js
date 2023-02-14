import { apiSlice } from "../../app/api/apiSlice";
import { userLogout } from "./userSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/user",
      keepUnusedDataFor: 5,
    }),
    userLogout: builder.mutation({
      query: () => ({
        url: "user/logout",
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetUserQuery, useUserLogoutMutation } = usersApiSlice;
