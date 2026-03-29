import React, { useEffect, useState } from "react";
import api from "../services/api";
const useCarts = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const cardsPerPage = 6;
  const start = (currentPage - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  const paginatedCarts = carts.slice(start, end);


  useEffect(() => {
    const fetchCarts = async () => {
      setLoading(true);
      try {
        const res = await api.get("/cart");
        const cartsData = res.data.carts;
        setCarts(cartsData || []);
      
        // Debug: print all products
        cartsData.forEach((cart) => {
          if (cart.products) {
            cart.products.forEach((product) => {
              console.log(product);
            });
          }
        });
      } catch (error) {
        console.error("Failed to fetch carts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);
  return {
carts,
loading,
paginatedCarts,
currentPage,
 totalPages :Math.ceil(carts.length / cardsPerPage),
setCurrentPage
  }
}

export default useCarts