import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Badge,
  Button,
  Card,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import { useAuth } from "../AuthContext";

const Login = () => {
  const [user, setUser] = useState("");
  const [pass, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();
  const { setIsSignedIn } = useAuth();

  const student_user = "student";
  const student_pass = "password1";

  const teacher_user = "admin";
  const teacher_pass = "password";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user === teacher_user && pass === teacher_pass) {
      setIsSignedIn(true);
      nav("/");
    } else if (user === student_user && pass === student_pass) {
      setIsSignedIn(true);
      nav("/exambuilder");
    } else {
      setError("Invalid, please try again.");
    }
  };

  return (
    <div
      className="d-flex flex-col justify-content-center align-items-center w-full max-w-md"
      style={{ height: "100vh" }}
    >
      <h1 className="inset-x-0 top-0 text-center p-4">
        LiveLearn <Badge bg="primary">Login</Badge>
      </h1>

      <Card
        style={{ width: "300px" }}
        className=" justify-items-center align-items-center"
      >
        <Card.Body>
          <Card.Title className="text-center mb-4">Welcome</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="formBasicUsername">
              <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  aria-placeholder="Enter username"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  aria-placeholder="Enter password"
                  value={pass}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </FloatingLabel>
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="d-grid gap-2">
              <Button variant="secondary" type="submit">
                Sign In
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
