import CardProduct from "components/CardProduct/CardProduct";
import React from "react";

// reactstrap components
import { Card, CardHeader, Row, Col, CardGroup } from "reactstrap";


function Home() {
  return (
    <>
      <div className="content">
        <Card>
          <CardHeader>Mais vendidos</CardHeader>
          <CardGroup>
            <CardProduct />
          </CardGroup>
        </Card>
      </div>
    </>
  );
}

export default Home;
