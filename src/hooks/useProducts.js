import React, { useCallback, useEffect, useState } from "react";
import api from "../services/api";

const useProducts = (search) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 6;

  const fetchProducts = useCallback(async (page, searchTerm) => {
    setLoading(true);

    try {
      const endpoint = searchTerm
        ? `/products/search?q=${searchTerm}&limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}`
        : `/products?limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}`;

      const res = await api.get(endpoint);
      setProducts(res.data.products);
      //   console.log(res.data);

      setTotalProducts(res.data.total);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts(currentPage, search);
  }, [fetchProducts, currentPage, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  return {
    products,
    loading,
    currentPage,
    totalPages,
    setCurrentPage,
  };
};

export default useProducts;
