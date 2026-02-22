import React, { useContext, useState } from "react";
import LogoutButton from "./LogoutButton";
import { Navbar, Container, Form, Nav, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = ({ search, setSearch }) => {
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
            </Nav>
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
