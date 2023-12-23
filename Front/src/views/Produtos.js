import React, { useState } from "react";

import { createProduto } from '../axios_helper';

import Swal from 'sweetalert2';

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

  const handleInputChange = async (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const arrayBuffer = reader.result;
        const byteArray = new Uint8Array(arrayBuffer);

        setProduto((prevProduto) => ({
          ...prevProduto,
          [name]: Array.from(byteArray),
        }));

      };

      reader.readAsArrayBuffer(file);
    } else {
      setProduto((prevProduto) => ({
        ...prevProduto,
        [name]: value,
      }));
    }
  };


  const handleCreate = async () => {

    if (!produto.name || !produto.image || !produto.price || !produto.amount || !produto.description) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, preencha todos os campos antes de criar o produto.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    try {
      const createdProduto = await createProduto(produto);
  
      Swal.fire({
        title: 'Success!',
        text: 'Produto criado com sucesso',
        icon: 'success',
        confirmButtonText: 'OK'
      });
  
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: `Erro ao criar o Produto: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
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
