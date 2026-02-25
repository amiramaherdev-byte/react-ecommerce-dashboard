import React from "react";
import { useEffect } from "react";
import api from "../services/api";
import { useState } from "react";

const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect
    (() => {
      const fetchCategories = async () => {
        setLoading(true);
        try {
          const res = await api.get("/products/categories");
        //   console.log(res);
          setCategories(res.data);
        } catch (error) {
        //   console.log(error);
        }
        setLoading(false);
      };
      fetchCategories();
    },
    []);

  return { categories, loading };
};

export default useCategory;
