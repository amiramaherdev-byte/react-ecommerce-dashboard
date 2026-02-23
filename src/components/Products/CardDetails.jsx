import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const CardDetails = ({ product }) => {
  return (
    <Container className="mt-5">
      <Row className="align-items-center">
        <Col md={6} className="text-center ">
          <img src={product.thumbnail} className="img-fluid d-block mx-auto" />
        </Col>

        <Col md={6} className="d-flex flex-column justify-content-center">
          <h2>{product.title}</h2>
          <p className="text-muted">{product.description}</p>
          <h4>${product.price}</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default CardDetails;
