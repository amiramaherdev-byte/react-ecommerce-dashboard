import React, { useState, useEffect } from "react";
import { Button, Form, Card, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { validateAuth } from "../../utils/validation/authValidation";
import { setCartFromAPI } from "../../features/carts/cartSlice";
import { fetchCart } from "../../features/carts/cartThunk";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateAuth({ identifier, password }, true);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    const res = await dispatch(login({ identifier, password }));

    if (res.meta.requestStatus === "fulfilled") {
      const cartAction = await dispatch(fetchCart(res.payload.id));

      dispatch(setCartFromAPI(cartAction.payload));

      navigate("/dashboard");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "500px", padding: "25px" }}>
        <h3 className="mb-3 text-center">Login</h3>

        {/* Demo Credentials Box */}
        <div className="bg-light border rounded p-3 mb-3">
          <h6 className="mb-2 text-primary">Demo Credentials</h6>

          <div className="small">
            <div>
              <strong>Username:</strong> emilys
            </div>
            <div>
              <strong>Password:</strong> emilyspass
            </div>
          </div>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username or Email</Form.Label>
            <Form.Control
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              isInvalid={!!formErrors.identifier}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.identifier}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!formErrors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </Button>

          <div className="d-flex justify-content-center mt-3">
            <p className="mb-0">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
