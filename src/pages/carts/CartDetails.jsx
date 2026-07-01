import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { Container, Spinner } from "react-bootstrap";
import CartSummary from "../../components/Carts/CartSummary";
import CartProductsList from "../../components/Carts/CartProductsList";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCarts } from "../../features/carts/cartThunk";
import { toast } from "react-toastify";

const CartDetails = () => {
  const { id } = useParams();
  const { carts, loading, error } = useSelector((state) => state.carts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCarts());
  }, [dispatch]);

  const cart = carts.find((cart) => cart.id === Number(id));

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) return <Spinner />;
  if (error) return null;

  if (!cart) return <h3>No carts found</h3>;

  return (
    <Container>
      <CartSummary cart={cart}></CartSummary>
      <CartProductsList products={cart.products}></CartProductsList>
    </Container>
  );
};

export default CartDetails;
