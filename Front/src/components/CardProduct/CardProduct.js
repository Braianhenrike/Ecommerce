import React, { useState, useEffect } from "react";

import {
  Card,
  Row,
  Col,
  Button,
} from "reactstrap";

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

import { getAllProducts } from "../../axios_helper";

import { useCart } from "components/UseCart/UseCart";

function CardProduct({ product }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();
  const [animating, setAnimating] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    getAllProducts().then((response) => {
      const data = response.data;
      console.log("Data from backend:", data);

      if (Array.isArray(data)) {
        console.log("Setting products in state:", data);
        setProducts(data);
      } else {
        console.log("Data is not an array:", data);
      }
    }).catch((error) => {
      console.error("Error fetching products:", error);
    });
  }, []);


  useEffect(() => {
    console.log("Products in state:", products);
  }, [products]);


  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === products.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? products.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const handleProdutoClick = (product, index) => {
    setSelectedProduct(product);
    setActiveIndex(index);
    addToCart(product);
  };



  const slides = Array.isArray(products)
    ? products.map((product, index) => (
      <CarouselItem key={product.id}>
        <Button>
          <img src={`data:image/png;base64,${product.image}`} alt={product.name} />
        </Button>
        <CarouselCaption captionText={product.name} captionHeader={product.price} />
        <div style={{ position: 'absolute', bottom: 0, width: '100%', textAlign: 'center' }}>
          <Button onClick={() => handleProdutoClick(product, index)}>
            Adicionar ao Carrinho
          </Button>
        </div>
      </CarouselItem>
    ))
    : null;

  return (
    <Row>
      <Col md="12">
        <Card>
          <Col>
            <Carousel
              activeIndex={activeIndex}
              next={next}
              previous={previous}
              interval={false}
              slide={false}
              className="custom-carousel"
            >
              {slides}
              <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={previous}
              />
              <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={next}
              />
            </Carousel>
          </Col>
        </Card>
      </Col>
    </Row>
  );
}

export default CardProduct;
