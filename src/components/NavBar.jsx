import React, { useState } from "react";
import { Button, Container, Form, Nav, Offcanvas } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

import {
  FaShoppingCart,
  FaBars,
  FaHome,
  FaBoxOpen,
  FaUsers,
  FaShoppingBag,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import SidebarButton from "./SidebarButton";
// import LogoutButton from "./LogoutButton";

const handleMobileNavClick = () => {
  setShow(false);
};

const NavBar = ({ loggedInUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  // Desktop collapse
  const [collapsed, setCollapsed] = useState(false);
  const cartItems = useSelector((state) => state.cart.items || []);
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const sidebarContent = (
    <div className="d-flex flex-column h-100">
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
              onClick={handleMobileNavClick}
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
            onClick={handleMobileNavClick}
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
              onClick={handleMobileNavClick}
              to="/carts"
              className={`text-white d-flex align-items-center ${
                collapsed ? "justify-content-center" : "gap-2"
              }`}
            >
              <FaShoppingCart />

              {!collapsed && "Carts"}
            </Nav.Link>
          )}

          {loggedInUser?.role === "admin" && (
            <Nav.Link
              as={Link}
              to="/users"
              onClick={handleMobileNavClick}
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
              onClick={handleMobileNavClick}
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
      </div>

      <div className="mt-auto pt-4">
        {token ? (
          <SidebarButton
            collapsed={collapsed}
            title="Log Out"
            icon={<FaSignOutAlt />}
            variant="danger"
            onClick={handleLogout}
          />
        ) : (
          location.pathname !== "/login" && (
            <SidebarButton
              collapsed={collapsed}
              title="Log In"
              icon={<FaSignInAlt />}
              variant="primary"
              onClick={() => navigate("/login")}
            />
          )
        )}
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

export default NavBar;
