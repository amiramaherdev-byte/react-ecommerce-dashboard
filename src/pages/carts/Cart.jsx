import { useDispatch, useSelector } from "react-redux";
import { useEffect, useContext } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
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

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Cart = ({ loggedInUser }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (loggedInUser) {
      dispatch(fetchCart(loggedInUser.id)).then((action) => {
        dispatch(setCartFromAPI(action.payload));
      });
    }
  }, [loggedInUser, dispatch]);

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
                          userId: loggedInUser.id,
                          product: { ...item, quantity: item.quantity - 1 },
                          currentItems: items,
                        }),
                      );
                      dispatch(decreaseQty(item.id));
                      toast.info(`${item.title} quantity decreased`);
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
                          userId: loggedInUser.id,
                          product: { ...item, quantity: item.quantity + 1 },
                          currentItems: items,
                        }),
                      );
                      dispatch(increaseQty(item.id));
                      toast.success(`${item.title} quantity increased`);
                    }}
                  >
                    +
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => {
                      dispatch(
                        removeProductAPI({
                          userId: loggedInUser.id,
                          productId: item.id,
                          currentItems: items,
                        }),
                      );
                      dispatch(removeFromCart(item.id));
                      toast.error(`${item.title} removed from cart`);
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

export default Cart;
