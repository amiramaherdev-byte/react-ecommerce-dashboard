import React, { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import ProductCard from "../../components/Products/ProductCard";
import Pagination from "../../components/Pagination/Pagination";
import useProducts from "../../hooks/useProducts";
const ProductList = ({ search }) => {

  const {
    products,
    loading,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useProducts(search);

  return (
    <Container className="mt-4">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Row xs={1} md={3} lg={4} className="g-4">
            {products.map((product) => (
              <Col key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        loading={loading}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
};

export default ProductList;
