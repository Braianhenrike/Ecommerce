import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardGroup } from "reactstrap";
import CardProduct from "components/CardProduct/CardProduct";
import { getAllProducts } from "../axios_helper";

function Home() {
  const [categories, setCategories] = useState([]);
  const [QuantityCategory, setQuantityCategory] = useState([]);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    getAllProducts()
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          let allCategorias = Array.from(
            new Set(data.map((product) => product.categoria))
          );
          allCategorias = allCategorias.filter(categoria => categoria !== null);

          const categoryCounts = allCategorias.reduce((counts, categoria) => {
            const nome = categoria.nome;

            if (nome !== undefined && nome !== null) {
              counts[nome] = (counts[nome] || 0) + 1;
            }

            return counts;
          }, {});

          const uniqueCategories = Object.keys(categoryCounts);

          const quantityCategory = uniqueCategories.length
          setCategories(uniqueCategories);
          console.log('uniqueCategories', uniqueCategories)
          setQuantityCategory(quantityCategory);
          setProducts(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getProductsByCategory = (categoria) => {
    if (!Array.isArray(products)) {
      console.error("Products is not an array:", products);
      return [];
    }
  
    const produtosDasCategorias = products.filter(
      (product) => product.categoria && product.categoria.nome === categoria);
    return produtosDasCategorias;
  };


  return (
    <>
      <div className="content">
        {categories.map((categoria, index) => {
          const productsByCategory = getProductsByCategory(categoria);
          
          return (
            (index === 0 || (index > 0 && categoria !== categories[index - 1])) ? (
              <Card key={`${categoria}_${index}`}>
                <CardHeader>{categoria}</CardHeader>
                <CardGroup className="d-flex justify-content-center align-items-center">
                  <CardProduct
                    category={categoria}
                    products={productsByCategory}
                  />
                </CardGroup>
              </Card>
            ) : null
          );
        })}
      </div>
    </>
  );
}

export default Home;