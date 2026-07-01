import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
};

const saveCart = (items) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
  items: getInitialCart(),
  },
  reducers: {
  addToCart: (state, action) => {
  const product = action.payload;
  const existing = state.items.find(i => i.id === product.id);

  if (existing) {
    existing.quantity += product.quantity || 1;
  } else {
    state.items.push({ ...product, quantity: product.quantity || 1 });
  }

  localStorage.setItem("cart", JSON.stringify(state.items));
},
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      saveCart(state.items);
    },
    increaseQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        saveCart(state.items);
      }
    },
    decreaseQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCart(state.items);
      }
    },
    setCartFromAPI: (state, action) => {
      if (state.items.length === 0) {
        state.items = action.payload;
        saveCart(state.items);
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, setCartFromAPI } = cartSlice.actions;
export default cartSlice.reducer;