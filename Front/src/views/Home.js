import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardGroup } from "reactstrap";
import CardProduct from "components/CardProduct/CardProduct";
import { getAllProducts } from "../axios_helper";

function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          const uniqueCategories = Array.from(
            new Set(data.map((product) => product.categoria))
          );
          setCategories(uniqueCategories);
          setProducts(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getProductsByCategory = (categoria) => {
    const filteredProducts = products.filter((product) => product.categoria.nome === categoria);
    console.log(`Products for category ${categoria}:`, filteredProducts);
    return filteredProducts;
  };

  return (
    <>
      <div className="content">
        {categories.map((categoria, index) => (
          <Card key={`${categoria.nome}_${index}`}>
            <CardHeader>{categoria.nome}</CardHeader>
            <CardGroup className="d-flex justify-content-center align-items-center">
              <CardProduct
                category={categoria.nome}
                products={getProductsByCategory(categoria.nome)}
              />
            </CardGroup>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Home;
