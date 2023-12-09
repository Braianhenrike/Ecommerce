import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { request, setAuthHeader } from '../axios_helper';

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

function Register(props) {
  const history = useHistory();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("USER");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedRole = localStorage.getItem("apiRole");
        if (storedRole === "admin") {
          setIsAdmin(storedRole === 'admin');
        };
        console.log("Stored Role:", storedRole);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!login || !password || !phone || !role) {
      setError("All fields are mandatory");
      return;
    }

    setIsSubmitting(true);

    try {
      if (isAdmin) {
        const res = await request("POST", "/auth/register", {
          login: login,
          password: password,
          phone: phone,
          role: role,
        });

        setAuthHeader(res.data.token);
        console.log("Autenticado com sucesso");
        history.push("/auth/login");
      } else {
        const res = await request("POST", "/auth/register", {
          login: login,
          password: password,
          phone: phone,
          role: "USER",
        });

        setAuthHeader(res.data.token);
        console.log("Autenticado com sucesso como usuário padrão");
        history.push("/auth/login");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("Você está logado como usuário padrão e por isso não pode criar outros usuários");
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div>
      <Col className="ml-auto mr-auto col-md-6 col-lg-4">
        <Card>
          <Form>
            <CardHeader>
              <CardTitle tag="h3">Register</CardTitle>
            </CardHeader>
            <CardBody>
              <Alert isOpen={error != null} color="danger">
                {error}
              </Alert>
              <FormGroup>
                <Label>
                  E-mail<span className="text-danger"> *</span>
                </Label>
                <Input
                  placeholder="E-mail"
                  type="login"
                  autoComplete="login"
                  value={login}
                  onChange={e => setLogin(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>
                  Senha<span className="text-danger"> *</span>
                </Label>
                <Input
                  placeholder="Senha"
                  type="password"
                  autoComplete="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>
                  Número de celular<span className="text-danger"> *</span>
                </Label>
                <Input
                  placeholder="Número de celular"
                  type="phone"
                  autoComplete="phone"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>
                  Tipo de usuário<span className="text-danger"> *</span>
                </Label>
                <Input
                  placeholder="Tipo de usuário"
                  type="select"
                  autoComplete="USER"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                >
                  <option>USER</option>
                  {isAdmin && <option value="ADMIN">ADMIN</option>}
                </Input>
              </FormGroup>

            </CardBody>
            <CardFooter>
              <Button
                className="btn-fill"
                color="primary"
                type="submit"
                onClick={e => handleSubmit(e)}
              >
                Submit
                {isSubmitting ? "..." : ""}
              </Button>
            </CardFooter>
          </Form>
        </Card>
      </Col>
    </div>
  );
}

export default Register;
