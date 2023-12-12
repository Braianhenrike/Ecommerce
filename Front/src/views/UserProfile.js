import React, { useState, useEffect } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import { getUserInfo, updateUser } from '../axios_helper';


function UserProfile() {
  const [user, setUser] = useState({
    id: null,
    login: "",
    phone: "",
    photo: "",
    role: "",
    facebook: "",
    gmail: "",
    twitter: ""
  });
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {



    try {
      const storedId = localStorage.getItem("apiUser");
      const userInfo = await getUserInfo(storedId);

      setUser({
        login: userInfo.data.login,
        phone: userInfo.data.phone || "",
        photo: userInfo.data.photo || "",
        role: userInfo.data.role || "",
        facebook: userInfo.data.facebook || "",
        gmail: userInfo.data.gmail || "",
        twitter: userInfo.data.twitter || ""
      });
    } catch (error) {
      console.error("Erro ao carregar os dados do usuário:", error);
    }
  };

  


  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("apiUser");

      const updatedUser = await updateUser(userId, user);

      console.log("Usuário atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar o usuário:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>Login</label>
                        <Input
                          placeholder="Login"
                          value={user.login}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="7">
                      <FormGroup>
                        <label>Role</label>
                        <Input
                          placeholder="Role"
                          value={user.role}
                          type="text"
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                    <Col md="5">
                      <FormGroup>
                        <label>Phone</label>
                        <Input
                          placeholder="Phone"
                          value={user.phone}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Facebook</label>
                        <Input
                          placeholder="Facebook Profile URL"
                          type="text"
                          name="facebook"
                          value={user.facebook}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Gmail</label>
                        <Input
                          placeholder="Gmail Address"
                          type="text"
                          name="gmail"
                          value={user.gmail}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Twitter</label>
                        <Input
                          placeholder="Twitter Profile URL"
                          type="text"
                          name="twitter"
                          value={user.twitter}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  className="btn-fill"
                  color="primary"
                  type="button"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </CardFooter>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar"
                      src={require("assets/img/emilyz.jpg")}
                    />
                    <h5 className="title">{user.login}</h5>
                  </a>
                </div>
              </CardBody>
              <CardFooter>
                <div className="button-container">
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                  </Button>
                  <Button className="btn-icon btn-round" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button className="btn-icon btn-round" color="google">
                    <i className="fab fa-google-plus" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserProfile;
