import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./pages/auth/Login";
import { AuthProvider } from "./context/AuthContext";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthRoute from "./routes/AuthRoute";


function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/register" element={<Register />} />
        

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
