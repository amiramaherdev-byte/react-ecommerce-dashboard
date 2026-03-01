import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/auth/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthRoute from "./routes/AuthRoute";
import ProductList from "./pages/products/ProductList";
import NavBar from "./components/Navbar";
import ProductDetails from "./pages/products/ProductDetails";
import CartList from "./pages/carts/CartList";
import CartDetails from "./pages/carts/CartDetails";
function App() {
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([]);

  return (
    <>
      <NavBar search={search} setSearch={setSearch} />

      <Routes>
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductList search={search} />
            </ProtectedRoute>
          }
        />

        <Route path="/products/:id" element={<ProductDetails />} />
        <Route
          path="/carts"
          element={
            <ProtectedRoute>
              <CartList />
            </ProtectedRoute>
          }
        />
        <Route path="/carts/:id" element={<CartDetails />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
