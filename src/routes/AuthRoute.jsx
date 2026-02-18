import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AuthRoute = ({children}) => {
  const { token } = useContext(AuthContext);

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;

};

export default AuthRoute;
