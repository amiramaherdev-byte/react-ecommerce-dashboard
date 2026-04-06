import api from "../../services/api";

export const getProducts = async (endpoint, signal) => {
  const res = await api.get(endpoint, { signal });
  return res.data.products;
};

export const fetchCategories = async (endpoint, signal) => {
  const res = await api.get(endpoint, { signal });
  return res.data;
};

export const createProductAPI = async (data) => {
  const res = await api.post("/products/add", data);
  return res.data;
};

export const updateProductAPI = async (id, data) => {
  const res = await api.put(`/products/${id}`, data);
  return res.data;
};

export const deleteProductAPI = async (id) => {
  await api.delete(`/products/${id}`);
  return id;
};