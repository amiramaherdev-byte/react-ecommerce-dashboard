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
      })
      .addCase(fetchAllCarts.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload;
      })
      .addCase(fetchAllCarts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default cartsSlice.reducer;