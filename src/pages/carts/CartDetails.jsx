import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { Container, Spinner } from "react-bootstrap";
import CartSummary from "../../components/Carts/CartSummary";
import CartProductsList from "../../components/Carts/CartProductsList";

const CartDetails = () => {
  const { id } = useParams();
  const [cart, setCart] = useState(null);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get(`/carts/${id}`);
        setCart(response.data);
      } catch (error) {}
    };

    fetchCart();
  }, [id]);

  if (!cart) return <Spinner />;
  return (
    <Container>
      <CartSummary cart={cart}></CartSummary>
      <CartProductsList products={cart.products}></CartProductsList>
          <div className="mt-4 p-3 border rounded bg-light">
    </div>
    </Container>
  );
};

export default CartDetails;