import { Row, Col, Card } from "react-bootstrap";

const CartSummary = ({ cart }) => {
  return (
    <div className="my-4">
      <Card className="p-4 shadow-sm">
        <h2 className="mb-3">Cart #{cart.id}</h2>
        <Row className="mb-2">
          <Col md={4}>
            <strong>User ID:</strong> {cart.userId}
          </Col>
          <Col md={4}>
            <strong>Total Products:</strong> {cart.totalProducts}
          </Col>
          <Col md={4}>
            <strong>Total Quantity:</strong> {cart.totalQuantity}
          </Col>
        </Row>

        <Card className="mt-3 p-3 bg-light">
          <Row>
            <Col md={6}>
              <h5>Total Before Discount:</h5>
              <p>${cart.total}</p>
            </Col>
            <Col md={6}>
              <h5>Total After Discount:</h5>
              <p className="text-success">${cart.discountedTotal}</p>
            </Col>
          </Row>
        </Card>
      </Card>
    </div>
  );
};

export default CartSummary;