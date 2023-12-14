import React, { useState } from "react";

import { createProduto } from '../axios_helper';

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


function Produtos() {
  const [produto, setProduto] = useState({
    name: "",
    image: "",
    price: "",
    amount: "",
    description: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduto((prevProduto) => ({
      ...prevProduto,
      [name]: value
    }));
  };


  const handleCreate = async () => {
    console.log(produto);
    try {

      const createdProduto = await createProduto(produto);

      console.log("Produto criado com sucesso");
    } catch (error) {
      console.error("Erro ao criar o Produto:", error, "produto:", produto);
    }
  };



  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Create product</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>Name</label>
                        <Input
                          name="name"
                          placeholder="Name"
                          type="text"
                          value={produto.name}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Image</label>
                        <Input
                          name="image"
                          type="file"
                          placeholder="imagem"
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="7">
                      <FormGroup>
                        <label>Price</label>
                        <Input
                          name="price"
                          placeholder="R$"
                          type="text"
                          value={produto.price}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="5">
                      <FormGroup>
                        <label>Amount</label>
                        <Input
                          name="amount"
                          placeholder="Amount"
                          type="number"
                          value={produto.amount}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Description</label>
                        <Input
                          name="description"
                          placeholder="Description"
                          type="text"
                          value={produto.description}
                          onChange={handleInputChange}
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
                  onClick={handleCreate}
                >
                  Create
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}



export default Produtos;
