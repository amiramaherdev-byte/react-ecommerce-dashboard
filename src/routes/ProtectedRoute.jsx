import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {  Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
// console.log("token in protected:", token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
