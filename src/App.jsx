import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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

import { ToastContainer } from "react-toastify";
import { fetchUsers } from "./features/users/usersThunks";
import Navbar from "./components/Navbar";

function App() {
  const dispatch = useDispatch();

  const { users, currentPage, error, search } = useSelector(
    (state) => state.users,
  );

  const { user: currentUser } = useSelector((state) => state.auth);

  // 🔄 fetch users
  useEffect(() => {
    dispatch(fetchUsers({ search, currentPage }));
  }, [dispatch, search, currentPage]);

  // 🔥 error handling
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  // 🔐 current logged user
  const loggedInUser = users.find((u) => u?.id === currentUser?.id);


  return (
    <>
      <Navbar loggedInUser={loggedInUser} />

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
              <ProductList />
            </ProtectedRoute>
          }
        />

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

        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<UsersDetails />} />

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

      <ToastContainer position="top-right" autoClose={2000}  />
    </>
  );
}

export default App;
