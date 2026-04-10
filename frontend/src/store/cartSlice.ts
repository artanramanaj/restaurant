import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  totalPrice: number;
};

const initialState: CartState = {
  items: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")!)
    : [],
  totalPrice: 0,
};

const calculateTotal = (items: CartItem[]) =>
  items.reduce((acc, item) => acc + item.price * item.quantity, 0);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    ...initialState,
    totalPrice: calculateTotal(initialState.items),
  },
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find((i) => i._id === action.payload._id);
      if (existing) {
        existing.quantity += action.payload.quantity; // ← increase quantity if already in cart
      } else {
        state.items.push(action.payload); // ← add new item
      }
      state.totalPrice = calculateTotal(state.items);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
      state.totalPrice = calculateTotal(state.items);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      state.totalPrice = calculateTotal(state.items);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter((i) => i._id !== action.payload); // ← remove if quantity reaches 0
        } else {
          item.quantity -= 1;
        }
      }
      state.totalPrice = calculateTotal(state.items);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
