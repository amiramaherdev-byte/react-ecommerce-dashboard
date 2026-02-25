import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

const useProducts = (search) => {
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [error, setError] = useState(null);

  useEffect(() => {
    let handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const itemsPerPage = 6;

  const fetchProducts = useCallback(
    async (signal) => {
      setLoading(true);

      try {
        setError(null);

        let endpoint = "/products";

        if (debouncedSearch) {
          endpoint = `/products/search?q=${debouncedSearch}`;
        } else if (category) {
          endpoint = `/products/category/${category}`;
        }

        const res = await api.get(endpoint, { signal });
        let filteredProducts = res.data.products;
        if (debouncedSearch && category) {
          filteredProducts = filteredProducts.filter(
            (product) => product.category === category,
          );
        }

        //sorting
        const sortMethods = {
          "price-asc": (a, b) => a.price - b.price,
          "price-desc": (a, b) => b.price - a.price,
          rating: (a, b) => b.rating - a.rating,
        };

        if (sortBy && sortMethods[sortBy]) {
          filteredProducts.sort(sortMethods[sortBy]);
        }

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedProducts = filteredProducts.slice(start, end);

        setProducts(paginatedProducts);
        setTotalProducts(filteredProducts.length);
      } catch (err) {
        if (err.code === "ERR_CANCELED") return;

        setError("Failed to fetch products");
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [debouncedSearch, category, sortBy, currentPage],
  );

  useEffect(() => {
    const controller = new AbortController();

    fetchProducts(controller.signal);
    return () => {
      controller.abort();
    };
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    currentPage,
    totalPages: Math.ceil(totalProducts / itemsPerPage),
    setCurrentPage,
    category,
    setCategory,
    sortBy,
    setSortBy,
  };
};

export default useProducts;
