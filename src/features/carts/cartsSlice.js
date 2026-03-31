import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCarts } from "./cartThunk";
const cartsSlice = createSlice({
  name: "carts",
  initialState: {
    carts: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCarts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCarts.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload;
      })
      .addCase(fetchAllCarts.rejected, (state,action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cartsSlice.reducer;
