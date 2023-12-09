import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import { request } from '../axios_helper';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  Label,
  Form,
  FormGroup,
  Input,
  Col,
  Alert
} from "reactstrap";

function Login(props) {
  const history = useHistory();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    setError(null);

    event.preventDefault();
    if (!login || !password) {
      setError("All fields are mandatory");
      console.log("All fields are mandatory");
      return;
    }
    setIsSubmitting(true);

    try {
      const res = await request("POST", "/auth/login", { login: login, password: password }, { cache: 'no-store' });

      if (res.data.token) {
        console.log("Autenticado com sucesso");

        localStorage.setItem("apiUser", res.data.userId);
        localStorage.setItem("apiToken", res.data.token);
        localStorage.setItem("apiRole", res.data.rolem);

        history.push("/user/home");
      }
    } catch (err) {
      console.log("Erro ao fazer login:", err.message);
      setError(err.message);
    }

    setIsSubmitting(false);
  }
  return (
    <div>
      <Col className="ml-auto mr-auto col-md-6 col-lg-4">
        <Card>
          <Form>
            <CardHeader>
              <CardTitle tag="h3">Login</CardTitle>
            </CardHeader>
            <CardBody>
              <Alert isOpen={error != null} color="danger">
                {error}
              </Alert>
              <FormGroup>
                <Label>Login</Label>
                <Input
                  placeholder="Login"
                  type="login"
                  autoComplete="login"
                  value={login}
                  onChange={e => setLogin(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>Password</Label>
                <Input
                  placeholder="Password"
                  type="password"
                  autoComplete="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </FormGroup>

              <span>
                Don't have an account? <a href="/auth/register">Register</a>
              </span>
            </CardBody>
            <CardFooter>
              <Button
                className="btn-fill"
                color="primary"
                type="submit"
                onClick={e => handleSubmit(e)}
              >
                Login
                {isSubmitting ? "..." : ""}
              </Button>
            </CardFooter>
          </Form>
        </Card>
      </Col>
    </div>
  );
}

export default Login;
