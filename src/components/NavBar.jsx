import React, { useContext, useState } from "react";
import LogoutButton from "./LogoutButton";
import { Navbar, Container, Form, Nav, Button, Badge } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

const NavBar = ({ search, setSearch }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const location = useLocation();
  const showSearch = location.pathname === "/products";

  const { token } = useContext(AuthContext);

  return (
    <>
      <Navbar variant="dark" bg="dark" expand="lg" className="">
        <Container fluid>
          <Navbar.Brand as={Link} to="/dashboard">
            My Store
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/products">
                Products
              </Nav.Link>
                  <Nav.Link as={Link} to="/carts">
                All carts
              </Nav.Link>
            </Nav>
            <Link to="/cart" className="position-relative d-inline-block">
              <FaShoppingCart size={24} />

              {totalQty > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalQty}
                </span>
              )}
            </Link>
            <div className="mx-4">{token && <LogoutButton />}</div>
            {showSearch && (
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  value={search}
                  aria-label="Search"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div></div>
    </>
  );
};

export default NavBar;
