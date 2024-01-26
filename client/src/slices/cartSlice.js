import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const storedCart = localStorage.getItem("cart");
const initialState = storedCart
  ? JSON.parse(storedCart)
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      //check if item's already in cart
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map(
          (x) => (x._id === existItem._id ? item : x) //if match id, replace old item
        );
      } else {
        state.cartItems = [...state.cartItems, item]; //add new item to cart
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
