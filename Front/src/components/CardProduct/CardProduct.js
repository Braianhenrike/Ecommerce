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

function CardProduct() {
  const [activeIndex, setActiveIndex] = useState(0);
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

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const slides = Array.isArray(products)
    ? products.map((product) => (
        <CarouselItem key={product.id}>
          <img
            src={`data:image/png;base64,${product.image}`}
            alt={product.name}
          />
          <CarouselCaption
            captionText={product.name}
            captionHeader={product.price}
          />
        </CarouselItem>
      ))
    : null;

  return (
    <Row>
      <Col md="12">
        <Card>
          <Col>
            <Button>
              <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
                interval={false}
                slide={false}
                className="custom-carousel"
              >
                <CarouselIndicators
                  items={products}
                  activeIndex={activeIndex}
                  onClickHandler={goToIndex}
                />
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
            </Button>
          </Col>
        </Card>
      </Col>
    </Row>
  );
}

export default CardProduct;
