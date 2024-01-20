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
          setQuantityCategory(quantityCategory);
          setProducts(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getProductsByCategory = (categoria) => {
    const filteredProducts = products.filter((product) => product.categoria && product.categoria.nome === categoria);
    let uniqueProducts = Array.from(new Set(filteredProducts.map((product) => product.nome)));
  
    // Contagem de categorias únicas
    const uniqueCategoriesCount = uniqueProducts.length;
  
    return {
      uniqueCategoriesCount,
      uniqueProducts: uniqueProducts.map((uniqueProductName) => {
        return filteredProducts.find((product) => product.nome === uniqueProductName);
      }),
    };
  };
  

  return (
    <>
      <div className="content">
        {categories.map((categoria, quantityCategory) =>
          (quantityCategory === 0 || (quantityCategory > 0 && categoria.nome !== categories[quantityCategory - 1].nome)) ? (
            <Card key={`${categoria.nome}_${quantityCategory}`}>
              <CardHeader>{categoria.nome}</CardHeader>
              <CardGroup className="d-flex justify-content-center align-items-center">
                <CardProduct
                  category={categoria.nome}
                  products={getProductsByCategory(categoria.nome)}
                />
              </CardGroup>
            </Card>
          ) : null
        )}
      </div>
    </>
  );
}

export default Home;