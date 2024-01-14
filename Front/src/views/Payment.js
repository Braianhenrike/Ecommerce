import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Table, Button } from "reactstrap";
import { useCart } from "components/UseCart/UseCart";
import { useLocation } from "react-router-dom";
import { useProduct } from "components/ProductContext/ProductContext";

function Payment() {
  const location = useLocation();
  const { cart, totalPurchase } = location.state || { cart: [], totalPurchase: 0 };
  const { removeFromCart } = useCart();
  const [cartUpdated, setCartUpdated] = useState(false);


  useEffect(() => {
    if (cartUpdated) {
      setCartUpdated(false);
    }
  }, [cart, cartUpdated]);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    setCartUpdated(true);
  };

  const calculateTotalPurchase = () => {
    return cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
  };

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
                  <td>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => handleRemoveFromCart(product.id)}
                    >
                      Remover
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div>Total da Compra: R${calculateTotalPurchase()}</div>
          {/* Adicione aqui os elementos para escolher métodos de pagamento */}
        </CardBody>
      </Card>
    </div>
  );
}

export default Payment;
