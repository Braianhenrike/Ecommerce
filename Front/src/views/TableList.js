import React, { useEffect, useState } from "react";

import Swal from 'sweetalert2';

import { useHistory } from "react-router-dom"; 

import { deleteProduct, getAllProducts } from "../axios_helper";

import {
  Card,
  CardHeader,
  CardBody,
  Table
} from "reactstrap";

function Tables() {
  const [products, setProducts] = useState([]);
  const history = useHistory(); 


  useEffect(() => {
    getAllProducts().then((response) => {
      setProducts(response.data);
    });
  }, []);
  
  const handleEdit = (product) => {
    console.log("product1", product);
    history.push({
      pathname: `/user/produtos/${product.id}`,
      state: { product: product }
    });
  };

  const handleDelete = async (productId) => {
    const result = await Swal.fire({
      title: 'Confirmação',
      text: `Deseja mesmo deletar o produto?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    });
  
    if (result.isConfirmed) {
      try {
        await deleteProduct(productId);
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
        Swal.fire('Deletado!', 'O produto foi deletado.', 'success');
      } catch (error) {
        Swal.fire('Erro!', `Erro ao deletar o produto: ${error}`, 'error');
      }
    }
  };

  const totalValueInStock = products.reduce((total, product) => {
    const price = parseFloat(product.price.replace(',', '.'));
    return total + (price * product.amount);
  }, 0);

  return (
    <div className="content">
      <Card>
        <CardHeader>
          <h3>Product Details</h3>
        </CardHeader>
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Category</th>
                <th>Total Value</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(products) && products.map((product) => {
                const price = parseFloat(product.price.replace(',', '.'));
                const totalValue = price * product.amount;
                return (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={`data:image/png;base64,${product.image}`}
                        alt={product.name}
                        style={{ maxWidth: "50px", maxHeight: "50px" }}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.amount}</td>
                    <td>{product.description}</td>
                    <td>{product.categoria.nome}</td>
                    <td>R${totalValue.toFixed(2)}</td>
                    <td>
                      <button onClick={() => handleEdit(product)}>Edit</button>
                      <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <h4>Total value in stock: R${totalValueInStock.toFixed(2)}</h4>
        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;