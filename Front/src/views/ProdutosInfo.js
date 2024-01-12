import { useProduct } from "components/ProductContext/ProductContext";
import React from "react";
import { Card, CardHeader, CardBody, CardImg, CardText, Button } from "reactstrap";

function ProdutosInfo({ product }) {
  const { selectedProduct } = useProduct();


  return (
    <>
      <div className="content">
        <Card>
          <CardHeader>{selectedProduct.name}</CardHeader>
          <CardImg
            top
            width="100%"
            src={`data:image/png;base64,${selectedProduct.image}`}
            alt={selectedProduct.name}
          />
          <CardBody>
            <CardText>
              <strong>Preço:</strong> {selectedProduct.price}<br />
              <strong>Quantidade:</strong> {selectedProduct.amount}<br />
              <strong>Descrição:</strong> {selectedProduct.description}
            </CardText>
            <Button color="primary">Adicionar ao Carrinho</Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default ProdutosInfo;
