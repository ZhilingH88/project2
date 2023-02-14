import { apiSlice } from "../../app/api/apiSlice";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "/cart/getCart",
      keepUnusedDataFor: 5,
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation({
      query: (product) => ({
        url: "/cart/addToCart",
        method: "POST",
        body: { ...product },
      }),
      invalidatesTags: ["Cart"],
    }),
    reduceFromCart: builder.mutation({
      query: (product) => ({
        url: "/cart/reduceFromCart",
        method: "PUT",
        body: { ...product },
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation({
      query: (product) => ({
        url: "/cart/removeItemFromCart",
        method: "DELETE",
        body: { ...product },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useReduceFromCartMutation,
  useRemoveFromCartMutation,
} = cartApiSlice;
