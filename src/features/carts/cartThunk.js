import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId) => {
    const res = await api.get(`/carts/user/${userId}`);
    const carts = res.data.carts;

    if (!carts || carts.length === 0) {
      const fallback = await api.get(`/carts/1`);
      return fallback.data.products.map((p) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        quantity: p.quantity,
      }));
    }

    return carts[0].products.map((p) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      quantity: p.quantity,
    }));
  }
);
  
export const addOrUpdateProductAPI = createAsyncThunk(
  "cart/addOrUpdateProduct",
  async ({ userId, product, currentItems }, thunkAPI) => {
    const updatedProducts = [...currentItems];
    const existing = updatedProducts.find(i => i.id === product.id);
    if (existing) {
      existing.quantity = product.quantity; 
    } else {
      updatedProducts.push(product);
    }

    const res = await api.put(`/carts/${userId}`, {
      merge: true,
      products: updatedProducts,
    });
    
    return res.data.products.map(p => ({
      id: p.id,
      title: p.title || p.name,
      price: p.price,
      quantity: p.quantity || 1,
    }));
  }
);

export const removeProductAPI = createAsyncThunk(
  "cart/removeProduct",
  async ({ userId, productId, currentItems }, thunkAPI) => {
    const filteredProducts = currentItems.filter(p => p.id !== productId);

    const res = await api.put(`/carts/${userId}`, {
      merge: false,
      products: filteredProducts,
    });

    return res.data.products.map(p => ({
      id: p.id,
      title: p.title || p.name,
      price: p.price,
      quantity: p.quantity || 1,
    }));
  }
);