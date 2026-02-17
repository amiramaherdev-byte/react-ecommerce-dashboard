import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      fetchUser(savedToken);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const response = await api.get("/auth/users/1", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response);
      setUser(response.data);
    } catch (err) {
      console.log(err);
      logout();
    }
  };

  const login = async (identifier, password) => {
    console.log("Login function started");

    try {
      const response = await api.post("/auth/login", {
        username: identifier, // username or email
        password,
      });
      console.log(response);

      console.log("Response data:", response.data);

      const data = response.data;
      setUser(data);
      setToken(data.token);
      localStorage.setItem("token", data.accessToken);

      return { success: true, data };
    } catch (err) {
      console.error(err.response?.data || err.message);
      console.log("Login failed", err);

      return { success: false, error: err.response?.data || err.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
