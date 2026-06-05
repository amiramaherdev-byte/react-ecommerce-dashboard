import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { Container, Spinner } from "react-bootstrap";
import CardDetails from "../../components/products/CardDetails";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        toast.error(
          err.response?.data?.message || err.message || "Something went wrong",
        );
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <Spinner />;

  return (
    <Container>
      <CardDetails product={product} />
    </Container>
  );
};

export default ProductDetails;
