/* eslint-disable no-console */
import { useEffect, useState } from "react";

import CardComponent from "@components/card/card";
import AppHeader from "@components/header/header";
import { IProductData } from "@interfaces/product-data";
import getProducts from "@services/get-products";

import { Container, Box } from "@mui/material";

import styles from "./catalog.module.scss";

const Catalog = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.results);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <AppHeader />
      <Container>
        <Box className={styles.container}>
          {products.map((product: IProductData) => (
            <CardComponent key={product.id} product={product} />
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Catalog;
