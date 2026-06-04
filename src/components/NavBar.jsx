import React, { useState } from "react";
import { Button, Container, Form, Nav, Offcanvas } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FaShoppingCart,
  FaBars,
  FaHome,
  FaBoxOpen,
  FaUsers,
  FaShoppingBag,
} from "react-icons/fa";
import LogoutButton from "./LogoutButton";
import { setProductSearch } from "../features/products/productsSlice";
import SearchInput from "./Search/SearchInput";

const Navbar = ({ loggedInUser }) => {
  const [show, setShow] = useState(false);
  // Desktop collapse
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const isProductsPage = location.pathname.startsWith("/products");
  const searchValue = useSelector((state) => state.products.search);
  const cartItems = useSelector((state) => state.cart.items || []);
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { token } = useSelector((state) => state.auth);

  const sidebarContent = (
    <div fluid className="d-flex flex-column h-100">
      {/* Top */}
      <div>
        {/* Collapse Button */}
        <div className="d-flex justify-content-end mb-4 d-none d-lg-flex">
          <Button
            variant="outline-light"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
          >
            <FaBars />
          </Button>
        </div>
        {/* Logo */}
        {!collapsed && (
          <h3 className="mb-4">
            <Link to="/dashboard" className="text-white text-decoration-none">
              My Store
            </Link>
          </h3>
        )}
        {/* Links */}
        <Nav
          className={`flex-column gap-3 w-100 ${
            collapsed ? "align-items-center" : ""
          }`}
        >
          {loggedInUser?.role === "admin" && (
            <Nav.Link
              as={Link}
              to="/dashboard"
              className={`text-white d-flex align-items-center ${
                collapsed ? "justify-content-center" : "gap-2"
              }`}
            >
              <FaHome />

              {!collapsed && "Dashboard"}
            </Nav.Link>
          )}

          <Nav.Link
            as={Link}
            to="/products"
            className={`text-white d-flex align-items-center ${
              collapsed ? "justify-content-center" : "gap-2"
            }`}
          >
            <FaBoxOpen />

            {!collapsed && "Products"}
          </Nav.Link>

          {loggedInUser?.role === "admin" && (
            <Nav.Link
              as={Link}
              to="/carts"
              className={`text-white d-flex align-items-center ${
                collapsed ? "justify-content-center" : "gap-2"
              }`}
            >
              <FaShoppingCart />

              {!collapsed && "carts"}
            </Nav.Link>
          )}

          {loggedInUser?.role === "admin" && (
            <Nav.Link
              as={Link}
              to="/users"
              className={`text-white d-flex align-items-center ${
                collapsed ? "justify-content-center" : "gap-2"
              }`}
            >
              <FaUsers />

              {!collapsed && "Users"}
            </Nav.Link>
          )}
        </Nav>
        {/* Cart */}
        {loggedInUser && (
          <div
            className={`mt-4 d-flex ${collapsed ? "justify-content-center" : ""}`}
          >
            <Link
              to="/cart"
              className="position-relative d-inline-block text-white"
            >
              <FaShoppingCart size={24} />

              {totalQty > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalQty}
                </span>
              )}
            </Link>
          </div>
        )}
        {/* Search */}
        {!collapsed && isProductsPage && (
          <Form className="mt-4">
            <SearchInput
              value={searchValue}
              onChange={(val) => dispatch(setProductSearch(val))}
              placeholder="Search Products..."
              className="form-control"
            />
          </Form>
        )}
      </div>

      {/* Logout */}
      <div className="mt-auto pt-4">
        {token? (<LogoutButton collapsed={collapsed} />):(<Link to="/login"><Button>log in</Button></Link>)}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="dark"
        className="m-3 d-lg-none"
        onClick={() => setShow(true)}
      >
        <FaBars />
      </Button>

      {/* Desktop Sidebar */}
      <div
        className="bg-dark text-white p-3 vh-100 d-none d-lg-flex flex-column"
        style={{
          width: collapsed ? "80px" : "250px",
          transition: "0.3s",
          overflow: "hidden",
        }}
      >
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        className="bg-dark text-white d-lg-none"
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>My Store</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>{sidebarContent}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navbar;
