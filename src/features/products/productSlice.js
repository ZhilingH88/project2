import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "../../utils/axios";

const initialState = {
  products: [],
  isLoading: false,
};

export const showProducts = createAsyncThunk(
  "products/getAllProducts",
  async (thunkAPI) => {
    try {
      const resp = await customFetch.get("/products/getAllProducts");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.status);
    }
  }
);
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(showProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = payload.products;
      })
      .addCase(showProducts.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload);
      });
  },
});

export const {} = productSlice.actions;
export default productSlice.reducer;
