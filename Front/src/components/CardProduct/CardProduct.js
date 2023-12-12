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

const products = [
  {
    id: 1,
    title: "Camiseta 1",
    price: 19.99,
    image: require("../../assets/img/camiseta1.png"),
  },
  {
    id: 2,
    title: "Camiseta 2",
    price: 24.99,
    image: require("../../assets/img/camiseta2.png"),
  },
  {
    id: 3,
    title: "Camiseta 3",
    price: 29.99,
    image: require("../../assets/img/camiseta3.png"),
  },
  {
    id: 4,
    title: "Camiseta 4",
    price: 29.99,
    image: require("../../assets/img/camiseta4.png"),
  },
];

function CardProduct() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

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

  const slides = products.map((product) => (
    <CarouselItem
      key={product.id}>
      <img
        src={product.image}
        alt={product.title}
        className="custom-carousel-image"
      />
      <CarouselCaption
        captionText={product.title}
        captionHeader={product.price}
      />
    </CarouselItem>
  ));

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
