import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
const CartCard = ({ cart }) => {
  return (
    <Card className="w-100 h-100 d-flex flex-column">
      <Card.Body className="flex-grow-1 d-flex flex-column ">
        <Card.Title>Total:{cart.total}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Total Products:{cart.totalProducts}
        </Card.Subtitle>

        <div className="mb-3 flex-grow-1">
          {cart.products &&
            cart.products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
        </div>
        <div>
          <Link to={`${cart.id}`}>
            <button className="btn btn-primary w-100 mt-auto">view cart</button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};
export default CartCard;
