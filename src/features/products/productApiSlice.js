import { apiSlice } from "../../app/api/apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productInfo) => ({
        url: "products/create",
        method: "POST",
        body: { ...productInfo },
      }),
    }),
    editProduct: builder.mutation({
      query: (productInfo) => ({
        url: "products/editProduct",
        method: "PUT",
        body: { ...productInfo },
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteProduct: builder.mutation({
      query: (product_id) => ({
        url: "products/deleteProduct",
        method: "DELETE",
        body: { ...product_id },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
