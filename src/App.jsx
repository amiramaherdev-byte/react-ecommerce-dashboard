import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./pages/auth/Login";
import { AuthProvider } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  const [count, setCount] = useState(0);


  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
