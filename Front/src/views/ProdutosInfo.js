import CardProduct from "components/CardProduct/CardProduct";
import React from "react";

import { Card, CardHeader, Row, Col, CardGroup } from "reactstrap";


function ProdutosInfo() {
  return (
    <>
      <div className="content">
        <Card>
          <CardHeader>Mais vendidos</CardHeader>
          <CardGroup className="d-flex justify-content-center align-items-center">
            <CardProduct />
            <CardProduct />
          </CardGroup>
        </Card>
      </div>
    </>
  );
}

export default ProdutosInfo;
