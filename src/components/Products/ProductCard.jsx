import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Card className="w-100">
      <Link
        to={`/products/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Card.Img variant="top" src={product.images[0]} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text className="line-clamp-2 ">{product.description}</Card.Text>
        </Card.Body>
      </Link>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{product.price}</ListGroup.Item>
        <ListGroup.Item>{product.stock}</ListGroup.Item>
        {product.tags &&
          product.tags.map((tag, index) => (
            <ListGroup.Item key={index}>{tag}</ListGroup.Item>
          ))}
      </ListGroup>
    </Card>
  );
};

export default ProductCard;
