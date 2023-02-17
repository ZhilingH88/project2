import { apiSlice } from "../../app/api/apiSlice";
import { LOGIN_FORM_TEXT } from "../../content/RegisterFormContent";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});
export const { useLoginMutation } = authApiSlice;
