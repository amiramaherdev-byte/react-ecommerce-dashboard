import React, { useState, useEffect } from "react";
import { Button, Form, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector((state) => state.auth);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!identifier || !password) return;

    const res = await dispatch(
      login({ identifier, password })
    );

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "500px", padding: "25px" }}>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <h3 className="mb-3 text-center">Login</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username or Email</Form.Label>
            <Form.Control
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;