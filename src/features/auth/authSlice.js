import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ identifier, password }, { rejectWithValue }) => {
    try {
      // login request
      const res = await api.post("/auth/login", {
        username: identifier,
        password,
      });

      const loginData = res.data;

      // full user data
      const userRes = await api.get(`/users/${loginData.id}`);

      // merge user + tokens
      const fullUser = {
        ...userRes.data,
        accessToken: loginData.accessToken,
        refreshToken: loginData.refreshToken,
      };


      // save
      localStorage.setItem("currentUser", JSON.stringify(fullUser));

      localStorage.setItem("accessToken", fullUser.accessToken);

      return fullUser;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Invalid username or password",
      );
    }
  },
);


export const register = createAsyncThunk("auth/register", async (data) => {
  return {
    user: {
      username: data.username,
      email: data.email,
    },
  };
});

const savedUser = localStorage.getItem("currentUser");

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: localStorage.getItem("accessToken") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("currentUser");
    },
  },

  extraReducers: (builder) => {
    builder
      // 🔐 LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.accessToken;
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
