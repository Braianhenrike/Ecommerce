import React from "react";
import { Card, CardHeader, CardBody, CardImg, CardText, Button } from "reactstrap";
import { useCart } from "components/UseCart/UseCart";
import { useProduct } from "components/ProductContext/ProductContext";

function ProdutosInfo() {
  const { selectedProduct } = useProduct();
  const { addToCart, removeFromCart } = useCart();

  const handleAddToCart = () => {
    selectedProduct.amount = selectedProduct.amount - 1
    addToCart(selectedProduct);
  };

  const handleRemoveFromCart = () => {
    selectedProduct.amount = selectedProduct.amount + 1
    removeFromCart(selectedProduct.id);
  };

  return (
    <div className="content">
      <Card>
        <CardHeader>{selectedProduct.name}</CardHeader>
        <CardImg
          src={`data:image/png;base64,${selectedProduct.image}`}
          alt={selectedProduct.name}
        />
        <CardBody>
          <CardText>
            <strong>Preço:</strong> {selectedProduct.price}<br />
            <strong>Quantidade:</strong> {selectedProduct.amount}<br />
            <strong>Descrição:</strong> {selectedProduct.description}
            <strong>Categoria:</strong> {selectedProduct.categoria}
          </CardText>
          <Button color="primary" onClick={handleAddToCart}>
            Adicionar ao Carrinho
          </Button>
          <Button color="danger" onClick={handleRemoveFromCart}>
            Remover do Carrinho
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default ProdutosInfo;