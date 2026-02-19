import React, { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.products);
      console.log(res.data.products);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container>
      <Row xs={1} md={3} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={product.images[0]} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>{product.price}</ListGroup.Item>
                <ListGroup.Item>{product.stock}</ListGroup.Item>
                {product.tags &&
                  product.tags.map((tag, index) => (
                    <ListGroup.Item key={index}>{tag}</ListGroup.Item>
                  ))}
              </ListGroup>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
