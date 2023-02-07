import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

export interface CartState {
  open: boolean;
  cart: any[];
}

const initialState: CartState = {
  open: false,
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.open = !state.open;
    },

    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1,
          date: state.cart.some((item) => item.date)
            ? ""
            : format(new Date(), "yyyy MM dd / HH:mm"),
        });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload
      );
      state.cart = removeItem;
    },
    emptyCart: (state) => {
      state.cart = [];
    },
  },
});
export default cartSlice.reducer;
export const {
  toggleCart,
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  emptyCart,
} = cartSlice.actions;
