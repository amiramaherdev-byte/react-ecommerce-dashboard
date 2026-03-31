import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, addUser, updateUser, deleteUser } from "./usersThunks";

const initialState = {
  users: [],
  loading: false,
  error: null,
  search: "",
  currentPage: 1,
  totalUsers: 0,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    updateLocalUser: (state, action) => {
      const { id, data } = action.payload;
      const index = state.users.findIndex((u) => u.id === id);
      if (index !== -1) {
        state.users[index] = {
          ...state.users[index],
          ...data,
        };
      }
    },

        deleteLocalUser: (state, action) => {
      
      state.users = state.users.filter((u) => u.id !== action.payload);
    },
    addLocalUser: (state, action) => {
      const newUser = {
        ...action.payload,
        id: Date.now(), 
        isLocal: true,
      };
      state.users.unshift(newUser);
      state.totalUsers += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.totalUsers = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.unshift({ ...action.payload, id: action.payload.id });
        state.totalUsers += 1;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = { ...action.payload };
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
        state.totalUsers -= 1;
      });
  },
});

export const { setSearch, setCurrentPage, updateLocalUser, addLocalUser ,deleteLocalUser } =
  usersSlice.actions;
export default usersSlice.reducer;