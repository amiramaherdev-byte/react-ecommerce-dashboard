import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/carts/cartSlice";
import cartsReducer from "../features/carts/cartsSlice";
import usersReducer from "../features/users/usersSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    carts: cartsReducer,
    users: usersReducer,
    auth: authReducer,
  },
});
