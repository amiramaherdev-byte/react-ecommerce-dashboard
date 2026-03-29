import { useDispatch, useSelector } from "react-redux";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  fetchCart,
  addOrUpdateProductAPI,
  removeProductAPI,
} from "../../features/carts/cartThunk";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  setCartFromAPI,
} from "../../features/carts/cartSlice";
const CartList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const { user } = useContext(AuthContext);

  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId)).then((action) => {
        dispatch(setCartFromAPI(action.payload));
      });
    }
  }, [userId, dispatch]);
  const handleIncrease = (item) => {
    dispatch(
      updateQtyAPI({
        userId: user.id,
        productId: item.id,
        quantity: item.quantity + 1,
      }),
    );
  };
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQtyAPI({
          userId: user.id,
          productId: item.id,
          quantity: item.quantity - 1,
        }),
      );
    }
  };
  const handleRemove = (item) => {
    dispatch(removeFromCartAPI({ userId: user.id, productId: item.id }));
  };

  return (
    <Container className="mt-4">
      <h3>🛒 Your Cart</h3>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <Row>
          {items.map((item) => (
            <Col key={item.id} xs={12} className="mb-3">
              <div className="border p-3 rounded d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.title}</h5>
                  <p>${item.price}</p>
                </div>
                <div className="quantity-controls d-flex align-items-center gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      dispatch(
                        addOrUpdateProductAPI({
                          userId: user.id,
                          product: { ...item, quantity: item.quantity - 1 },
                          currentItems: items,
                        }),
                      );
                      dispatch(decreaseQty(item.id));
                    }}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </Button>

                  <span>{item.quantity}</span>

                  <Button
                    variant="secondary"
                    onClick={() => {
                      dispatch(
                        addOrUpdateProductAPI({
                          userId: user.id,
                          product: { ...item, quantity: item.quantity + 1 },
                          currentItems: items,
                        }),
                      );
                      dispatch(increaseQty(item.id));
                    }}
                  >
                    +
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => {
                      dispatch(
                        removeProductAPI({
                          userId: user.id,
                          productId: item.id,
                          currentItems: items,
                        }),
                      );
                      dispatch(removeFromCart(item.id));
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CartList;
