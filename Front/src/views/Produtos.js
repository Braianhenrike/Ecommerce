import React, { useEffect, useState } from "react";
import { createProduto, createCategoria, getAllCategorias, updateProduto } from '../axios_helper';
import Swal from 'sweetalert2';
import { Button, Card, CardHeader, CardBody, CardFooter, FormGroup, Form, Input, Row, Col } from "reactstrap";
import { useLocation } from "react-router-dom";

function Produtos() {
  const [produto, setProduto] = useState({
    name: "",
    image: "",
    price: "",
    amount: "",
    description: "",
    categoria: "", 
  });

  const location = useLocation();
  const product = location.state?.product;
  const [categorias, setCategorias] = useState([]);
  const [novaCategoria, setNovaCategoria] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const fetchCategorias = async () => {
    try {
      const categoriasResponse = await getAllCategorias();
      setCategorias(categoriasResponse.data.filter((element) => element.nome.trim() !== ''));
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

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
        [name]: type === 'select' ? parseInt(value, 10) : value,
      }));
    }
  };

  const handleEdit = async () => {
    if (!produto.name || !produto.image || !produto.price ||
      !produto.amount || !produto.description) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, preencha todos os campos antes de editar o produto.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      const response = await updateProduto(produto.id, produto);
      if (response.data.error) {
        Swal.fire({
          title: 'Error!',
          text: response.data.error,
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }

      Swal.fire({
        title: 'Success!',
        text: 'Produto editado com sucesso',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: `Erro ao editar o Produto: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleCreate = async () => {
    if (!produto.name || !produto.image || !produto.price ||
      !produto.amount || !produto.description) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, preencha todos os campos antes de criar o produto.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      const response = await createProduto(produto);
      if (response.data.error) {
        Swal.fire({
          title: 'Error!',
          text: response.data.error,
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }

      Swal.fire({
        title: 'Success!',
        text: 'Produto criado com sucesso',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      setProduto({
        name: "",
        image: "",
        price: "",
        amount: "",
        description: "",
        categoria: "",
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


  const handleCreateCategoria = async () => {
    try {
      await createCategoria({ nome: novaCategoria });
      fetchCategorias();
      setNovaCategoria("");
      Swal.fire({
        title: 'Success!',
        text: 'Categoria criada com sucesso',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: `Erro ao criar a Categoria: ${error.message}`,
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
                        <label>Categoria</label>
                        <Input
                          name="categoria"
                          type="select"
                          value={produto.categoria}
                          onChange={handleInputChange}
                        >
                          <option value="">Selecione a categoria</option>
                          {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                              {categoria.nome}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>

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
                  onClick={isEditing ? handleEdit : handleCreate}
                >
                  {isEditing ? 'Edit' : 'Create'}
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <h5 className="title">Create category</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-md-1" md="12">
                      <FormGroup>
                        <label>New Category</label>
                        <Input
                          name="novaCategoria"
                          placeholder="New Category"
                          type="text"
                          value={novaCategoria}
                          onChange={(e) => setNovaCategoria(e.target.value)}
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
                  onClick={handleCreateCategoria}
                >
                  Create Category
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
