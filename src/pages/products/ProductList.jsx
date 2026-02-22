import React, { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import {
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Spinner,
  Button,
} from "react-bootstrap";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 6;

  const fetchProducts = useCallback(async (page) => {
    setLoading(true);

    try {
      const res = await api.get(
        `/products?limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}`,
      );
      setProducts(res.data.products);
      //   console.log(res.data);

      setTotalProducts(res.data.total);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [fetchProducts, currentPage]);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  return (
    <Container>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Row xs={1} md={3} lg={4} className="g-4">
            {products.map((product) => (
              <Col key={product.id}>
                <Card className="w-100">
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
        </>
      )}

      <Row>
        <Col className="d-flex justify-content-center mt-2 flex-wrap">
          <Button
            disabled={currentPage === 1 || loading}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </Button>

          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              style={{
                backgroundColor: currentPage === index + 1 ? "green" : "gray",
                margin: "3px",
              }}
            >
              {index + 1}
            </Button>
          ))}

          {/* {          Array.from({ length: 5 }, (item, index) => console.log(item, index))
} */}

          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;
