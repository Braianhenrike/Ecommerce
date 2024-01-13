import React from "react";
import { Card, CardHeader, CardBody, Table } from "reactstrap";
import { useLocation } from "react-router-dom";

function Payment() {
  const location = useLocation();
  const { cart, totalPurchase } = location.state || { cart: [], totalPurchase: 0 };

  return (
    <div className="content">
      <Card>
        <CardHeader>
          <h3>Detalhes do Pagamento</h3>
        </CardHeader>
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Produto</th>
                <th>Preço</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id}>
                <td>
                  <img
                    src={`data:image/png;base64,${product.image}`}
                    alt={product.name}
                    style={{ maxWidth: "50px", maxHeight: "50px" }}
                  />
                </td>
                  <td>{product.name}</td>
                  <td>R${product.price}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div>Total da Compra: R${totalPurchase}</div>
          {/* Adicione aqui os elementos para escolher métodos de pagamento */}
        </CardBody>
      </Card>
    </div>
  );
}

export default Payment;
