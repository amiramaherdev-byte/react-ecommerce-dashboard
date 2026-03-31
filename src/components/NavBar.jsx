import React from "react";
import {
  Navbar as BSNavbar,
  Container,
  Form,
  Nav,
  Button,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
import { setProductSearch } from "../features/products/productsSlice";
import SearchInput from "./ٍSearch/SearchInput";

const Navbar = ({ loggedInUser }) => {
  const dispatch = useDispatch();

  const location = useLocation();
  const isProductsPage = location.pathname.startsWith("/products");

  const searchValue = useSelector((state) => state.products.search);

  const cartItems = useSelector((state) => state.cart.items || []);
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { token } = useSelector((state) => state.auth);

  return (
    <BSNavbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <BSNavbar.Brand as={Link} to="/dashboard">
          My Store
        </BSNavbar.Brand>

        <BSNavbar.Toggle aria-controls="navbarScroll" />

        <BSNavbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>

            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>

            {loggedInUser?.role === "admin" && (
              <Nav.Link as={Link} to="/carts">
                All carts
              </Nav.Link>
            )}

            {loggedInUser?.role === "admin" && (
              <Nav.Link as={Link} to="/users">
                Users
              </Nav.Link>
            )}
          </Nav>

          <Link to="/cart" className="position-relative d-inline-block me-3">
            <FaShoppingCart size={24} />
            {totalQty > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalQty}
              </span>
            )}
          </Link>

          <div className="mx-3">{token && <LogoutButton />}</div>

          {isProductsPage && (
            <Form className="d-flex">
              <SearchInput
                value={searchValue}
                onChange={(val) => dispatch(setProductSearch(val))}
                placeholder="Search Products..."
                className="mt-1 form-control"
              />
            </Form>
          )}
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
