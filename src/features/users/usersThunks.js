import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async ({ search = "", page = 1, limit = 6 }, { rejectWithValue }) => {
    try {
      const skip = (page - 1) * limit;

      let endpoint = `/users?limit=${limit}&skip=${skip}`;

      if (search) {
        endpoint = `/users/search?q=${search}&limit=${limit}&skip=${skip}`;
      }

      const res = await api.get(endpoint);
      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch users");
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/users/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch user");
    }
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (user, { rejectWithValue }) => {
    try {
      const res = await api.post("/users/add", user);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add user");
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/users/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update user");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/users/${id}`);
      return id; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete user");
    }
  }
);