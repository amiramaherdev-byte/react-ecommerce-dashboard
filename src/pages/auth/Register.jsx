import React, { useState , useEffect } from "react";
import { Card, Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, login } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { validateAuth } from "../../utils/validation/authValidation";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  const handleRegister = async (e) => {
    e.preventDefault();
    const errors = validateAuth({ username, email, password });    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    const res = await dispatch(register({ username, email, password }));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "500px", padding: "25px" }}>
        <Form onSubmit={handleRegister}>
          <Form.Control
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            isInvalid={!!formErrors.username}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.username}
          </Form.Control.Feedback>

          <Form.Control
            type="email"
            className="mt-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!formErrors.email}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.email}
          </Form.Control.Feedback>

          <Form.Control
            type="password"
            className="mt-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!formErrors.password}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.password}
          </Form.Control.Feedback>

          <Button className="mt-3" type="submit">
            Register
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
