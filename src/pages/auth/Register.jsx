import React, { useContext, useState } from "react";
import { Card, Container, Form, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!username || !email || !password) {
      setError("All fields are required ");

      return;
    }

    try {
      //   const response = await api.post("/auth/register", {
      //     username,
      //     email,
      //     password,
      //   });
      //   console.log("Register success", response.data);
      const registerRes = await login(username, password);
      if (!registerRes.success) {
        setError("Login after register failed");
        // console.log("Login attempt failed for:", username);
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "500px", padding: "25px" }}>
        {error && <Alert className="alert-danger">{error}</Alert>}
        <Form onSubmit={handleRegister}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter  username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <div className="d-flex text-center justify-content-center mt-4 ">
            <Button variant="primary" type="submit">
              Register
            </Button>
          </div>
          <div className="mt-3 text-center">
            Have an account ? <a href="/login">Login</a>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
