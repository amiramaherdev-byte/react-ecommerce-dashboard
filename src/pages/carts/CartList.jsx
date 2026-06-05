import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CartCard from "../../components/Carts/CartCard";
import { fetchAllCarts } from "../../features/carts/cartThunk";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";

const CartList = () => {
  const dispatch = useDispatch();

  const { carts, loading, error } = useSelector((state) => state.carts);

  useEffect(() => {
    dispatch(fetchAllCarts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <Container>
   <div
  className="topbar text-white px-4 py-3 mb-4 rounded-4 shadow"
  style={{
    background: "linear-gradient(135deg, #f59e0b, #ea580c)",
  }}
>
  <div className="d-flex align-items-center gap-3">
    <div
      className="bg-white text-warning rounded-circle d-flex align-items-center justify-content-center"
      style={{ width: "50px", height: "50px" }}
    >
      <FaShoppingCart size={22} />
    </div>

    <div>
      <h3 className="mb-0 fw-bold">Carts</h3>
      <p className="mb-0 text-light opacity-75">
        Monitor customer carts and orders
      </p>
    </div>
  </div>
</div>

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
