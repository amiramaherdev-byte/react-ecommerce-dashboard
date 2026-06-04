import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProducts,
  getCategories,
} from "../features/products/productsSlice";
import { fetchUsers } from "../features/users/usersThunks";
import { fetchAllCarts } from "../features/carts/cartThunk";


const useDashboardData = () => {
      const { total, categories, products } = useSelector(
    (state) => state.products,
  );
  const productsPerCategory = useMemo(() => {
    if (!products || !categories) return [];

    return categories.map((cat) => {
      const count = products.filter((p) => p.category === cat.slug).length;

      return {
        name: cat.name,
        value: count,
      };
    });
  }, [products, categories]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProducts());
    dispatch(fetchAllCarts());
    dispatch(getCategories());
  }, [dispatch]);

  const { totalUsers, users } = useSelector((state) => state.users);
  const latestUsers = useMemo(() => {
    return [...users].slice(-5).reverse();
  }, [users]);

  const { carts } = useSelector((state) => state.carts);

  const totalCarts = carts.length;



  const stats = [
    {
      title: "Users",
      value: totalUsers,
      icon: "👤",
      path: "/users",
    },
    {
      title: "Products",
      value: total,
      icon: "📦",
      path: "/products",
    },
    {
      title: "Carts",
      value: totalCarts,
      icon: "🛒",
      path: "/carts",
    },
    {
      title: "Categories",
      value: categories?.length || 0,
      icon: "🏷️",
    },
  ];

    return {
    stats,
    latestUsers,
    users,
    productsPerCategory,
  };
};


export default useDashboardData