import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CartCard from "../../components/carts/CartCard";
import { fetchAllCarts } from "../../features/carts/cartThunk";
import { toast } from "react-toastify";

const CartList = () => {

  const dispatch = useDispatch();

  const { carts, loading, error } = useSelector(
    (state) => state.carts
  );

  useEffect(() => {
    dispatch(fetchAllCarts());
  }, [dispatch]);

  useEffect(() => {
  if (error) {
    toast.error(error);
  }
}, [error]);

  return (
    <Container className="mt-4">
      <h3>🛒 All Carts</h3>

      {loading ? (
        <Spinner />
      ) : carts.length === 0 ? (
        <p>No carts found</p>
      ) : (
        <Row>
          {carts.map((cart) => (
            <Col key={cart.id} xs={12} sm={6} md={4} className="mb-4">
              <CartCard cart={cart} />
              
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CartList;