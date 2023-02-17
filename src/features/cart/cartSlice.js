import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  discount: 0,
  tax: 0,
  subtotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
      state.discount = 0;
      state.tax = 0;
      state.subtotal = 0;
    },
    addItemToCart: (state, { payload }) => {
      console.log(payload);
      const item = state.cartItems.find(
        (item) => item.product_id === payload.product_id
      );
      if (item) {
        item.quantity = item.quantity + payload.quantity;
      } else {
        state.cartItems = [...state.cartItems, payload];
      }
    },
    reduceItemFromCart: (state, { payload }) => {
      const item = state.cartItems.find((item) => item.product_id === payload);
      item.quantity = item.quantity - 1;
    },
    removeItemFromCart: (state, { payload }) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product_id !== payload
      );
    },
    setCartItem: (state, { payload }) => {
      state.cartItems = payload;
    },
    setDiscount: (state, { payload }) => {
      state.discount = payload;
    },
    calculateTotals: (state) => {
      let subtotal = 0;
      let amount = 0;
      state.cartItems.forEach((item) => {
        if (item.stock != 0) {
          amount += item.quantity;
          subtotal += item.quantity * item.price;
        }
      });
      state.subtotal = subtotal;
      state.amount = amount;
      state.tax = subtotal * 0.0863;
      state.total = subtotal + subtotal * 0.0863 - state.discount;
    },
  },
});

export const {
  setCartItem,
  calculateTotals,
  setDiscount,
  clearCart,
  addItemToCart,
  reduceItemFromCart,
  removeItemFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
