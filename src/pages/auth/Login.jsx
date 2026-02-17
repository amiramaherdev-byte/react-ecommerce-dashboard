import React, { useContext, useState } from "react";
import { Button, Form, Card, Container } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    if (!identifier || !password) {
      setError("Please enter username/email and password.");
      return;
    }

    try {
      const success = await login(identifier, password);

      if (success) {
        navigate("/dashboard"); 
      } else {
        setError("Invalid username or password."); 
        console.log("Login attempt failed for:", identifier);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Something went wrong";
      setError(msg);
      console.log("Technical error:", err);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "500px", padding: "25px" }}>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <h3 className="mb-3 text-center">Login</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username or Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username or email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>

        <div className="mt-3 text-center">
          <small>
            Don't have an account? <a href="/register">Register</a>
          </small>
        </div>
      </Card>
    </Container>
  );
};

export default Login;
