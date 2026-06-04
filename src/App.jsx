import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import ProductList from "./pages/products/ProductList";
import ProductDetails from "./pages/products/ProductDetails";
import Cart from "./pages/carts/Cart";
import CartList from "./pages/carts/CartList";
import CartDetails from "./pages/carts/CartDetails";
import UsersList from "./pages/users/UsersList";
import UsersDetails from "./pages/users/UsersDetails";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthRoute from "./routes/AuthRoute";
import { toast, ToastContainer } from "react-toastify";
import { fetchUsers } from "./features/users/usersThunks";
import Navbar from "./components/NavBar";
import { Spinner } from "react-bootstrap";

function App() {
  const dispatch = useDispatch();

  const { user: loggedInUser } = useSelector((state) => state.auth);

  // fetch users
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="d-flex vh-100 overflow-hidden">
      {/* Nav bar */}

      <div className="d-flex flex-column ">
        <Navbar loggedInUser={loggedInUser} />
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 bg-light d-flex flex-column">
        <div className="p-4 overflow-auto flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={
                loggedInUser ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<ProductList loggedInUser={loggedInUser} />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart loggedInUser={loggedInUser} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/carts"
              element={
                <ProtectedRoute>
                  <CartList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/carts/:id"
              element={
                <ProtectedRoute>
                  <CartDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <UsersList  />
                </ProtectedRoute>
              }
            />

            <Route path="/users/:id" element={<UsersDetails />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </div>
  );
}

export default App;
