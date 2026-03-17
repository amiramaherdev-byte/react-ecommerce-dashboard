import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getProducts,
  createProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from "./productsAPI";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    { search, category, sortBy, currentPage },
    { signal, rejectWithValue },
  ) => {
    try {
      let endpoint = "/products";

      if (search) endpoint = `/products/search?q=${search}`;
      else if (category) endpoint = `/products/category/${category}`;

      let products = await getProducts(endpoint, signal);

      // filter
      if (search && category) {
        products = products.filter((p) => p.category === category);
      }

      // sorting
      const sortMethods = {
        "price-asc": (a, b) => a.price - b.price,
        "price-desc": (a, b) => b.price - a.price,
        rating: (a, b) => b.rating - a.rating,
        "title-asc": (a, b) =>
          a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
        "title-desc": (a, b) =>
          b.title.localeCompare(a.title, undefined, { sensitivity: "base" }),
      };

      if (sortBy && sortMethods[sortBy]) {
        products = [...products].sort(sortMethods[sortBy]);
      }

      // pagination
      const itemsPerPage = 6;
      const start = (currentPage - 1) * itemsPerPage;

      const paginatedProducts = products.slice(start, start + itemsPerPage);

      return {
        products: paginatedProducts,
        total: products.length,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (data, { rejectWithValue }) => {
    try {
      return await createProductAPI(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateProductAPI(id, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteProductAPI(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const productsSlice = createSlice({
  name: "products",

  initialState: {
    products: [],
    total: 0,
    status: "idle",
    error: null,
  },

  reducers: {
    updateLocalProduct: (state, action) => {
      const { id, data } = action.payload;

      const index = state.products.findIndex((p) => p.id === id);

      if (index !== -1) {
        state.products[index] = {
          ...state.products[index],
          ...data,
        };
      }
    },

    deleteLocalProduct: (state, action) => {
      
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
        state.total = action.payload.total;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        const tags = action.meta.arg.tags;

        const newProduct = {
          ...action.payload,
          id: Date.now(),
          tags,
          isLocal: true,
        };

        state.products = [newProduct, ...state.products];
        state.total += 1;
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        const { id, data } = action.meta.arg;

        const index = state.products.findIndex((p) => p.id === id);

        if (index !== -1) {
          state.products[index] = {
            ...state.products[index],
            ...data,
          };
        }
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      });
  },
});

export default productsSlice.reducer;
export const { updateLocalProduct , deleteLocalProduct
 } = productsSlice.actions;
