import { Card, CardBody, Row, Col, Button, CardFooter, CardTitle } from "reactstrap";
import React, { useEffect, useState } from "react";




function CardProduct() {

  const [product, setProduct] = useState({
    id: null,
    name: "Vai ser o Nome",
    amount: 3,
    price: 98.99
  });
  useEffect(() => {
  }, []);
  
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <Col>
                <Button>
                  <CardTitle>
                    {product.name}
                  </CardTitle>
                  <CardBody className="all-icons">
                    <img
                      alt="..."
                      className="image"
                      src={require("../../assets/img/camiseta1.png")}
                    />

                  </CardBody>
                  <CardFooter>
                    <p className="text-danger">
                      {product.price}
                    </p>
                  </CardFooter>
                </Button>
              </Col>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default CardProduct;
