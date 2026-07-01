import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { Container, Spinner } from "react-bootstrap";
import CardDetails from "../../components/Products/CardDetails";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productsSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const { products, error, loading } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const product = products.find((product) => product.id === Number(id));

  if (loading) return <Spinner />;

  if (!product) return <h3>Product not found</h3>;
  return (
    <Container>
      <CardDetails product={product} />
    </Container>
  );
};

export default ProductDetails;
