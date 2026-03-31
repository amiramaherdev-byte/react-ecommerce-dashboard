import React, { useState } from "react";
import { Card, Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, login } from "../../features/auth/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await dispatch(
      register({ username, email, password })
    );

    if (res.meta.requestStatus === "fulfilled") {
      await dispatch(login({ identifier: username, password }));
      navigate("/dashboard");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "500px", padding: "25px" }}>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleRegister}>
          <Form.Control
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Form.Control
            type="email"
            className="mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Form.Control
            type="password"
            className="mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button className="mt-3" type="submit">
            Register
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;