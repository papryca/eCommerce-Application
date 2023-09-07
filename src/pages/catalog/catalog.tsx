/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import { useCallback, useEffect, useState } from "react";

import CardComponent from "@components/card/card";
import CategoryNavigation from "@components/category-navigation/category-navigation";

import FilterComponent from "@components/filter/filter";
import AppHeader from "@components/header/header";
import SearchField from "@components/search/search-field";
import SortingField from "@components/sorting/sort-field";
import { Category } from "@interfaces/category";
import { IProductData } from "@interfaces/product-data";
import { IProductSearchResult } from "@interfaces/product-search-result";
import getCategories from "@services/get-categories-by-id";
import getFilteredAndSortedProducts from "@services/get-filtered-and-sorted";
import getProducts from "@services/get-products";

import {
  Container,
  Box,
  CircularProgress,
  Typography,
  Stack,
} from "@mui/material";

import styles from "./catalog.module.scss";

const Catalog = () => {
  const [products, setProducts] = useState<IProductData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortingOption, setSortingOption] = useState("");
  const [filterCriteria, setFilterCriteria] = useState<Record<string, string>>(
    {}
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // fetching products with filters and/or sorting applied
  const fetchFilteredAndSortedProducts = useCallback(async () => {
    try {
      setSearchError(false);
      setIsLoading(true);
      const response = await getFilteredAndSortedProducts(
        filterCriteria,
        sortingOption,
        searchQuery
      );
      setProducts(response);
      setIsLoading(false);
    } catch (error) {
      setSearchError(true);
      console.error("Error fetching products:", error);
      setIsLoading(false);
    }
  }, [searchQuery, sortingOption, filterCriteria]);

  // fetching the list of products
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getProducts();
      setProducts(response.results);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching products:", error);
    }
  }, []);

  // fetching categories
  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getCategories();
      setCategories(response.results);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  const handleCategoryClick = (
    event: React.MouseEvent<HTMLDivElement>,
    categoryId: string
  ) => {
    setSelectedCategory(categoryId);
    if (categoryId === selectedCategory) {
      setSelectedCategory(null);
    } else {
      const newFilterCriteria: Record<string, string> = {};
      newFilterCriteria["categories.id"] = ` subtree("${categoryId}")`;
      setFilterCriteria(newFilterCriteria);
    }
  };

  // handle fetching, filtering, sorting, and searching based on dependencies
  useEffect(() => {
    if (!sortingOption && Object.keys(filterCriteria).length === 0) {
      console.log("fetchProducts");
      fetchProducts();
      fetchCategories();
    }

    if (!selectedCategory) {
      delete filterCriteria["categories.id"];
      fetchFilteredAndSortedProducts();
    }

    if (
      sortingOption ||
      Object.keys(filterCriteria).length > 0 ||
      selectedCategory
    ) {
      fetchFilteredAndSortedProducts();
    }
  }, [sortingOption, filterCriteria, selectedCategory]);

  return (
    <>
      <AppHeader />
      <Container className={styles.catalogContainer}>
        <Box>
          <Typography mb={2}>Categories:</Typography>
          <Stack
            direction="row"
            spacing={1}
            mb={2}
            pb={2}
            sx={{ overflow: "auto" }}
          >
            <CategoryNavigation
              categories={categories}
              selectedCategory={selectedCategory}
              onClick={handleCategoryClick}
            />
          </Stack>
        </Box>
        <SearchField
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchHandler={fetchFilteredAndSortedProducts}
          isLoading={isLoading}
        />
        <Typography variant="h6" gutterBottom>
          Sorting
        </Typography>
        <SortingField
          sortingOption={sortingOption}
          setSortingOption={setSortingOption}
        />
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
        <FilterComponent
          onFilterChange={setFilterCriteria}
          selectedCategory={selectedCategory}
        />
        <Box className={styles.container}>
          {isLoading ? (
            <CircularProgress />
          ) : searchError ? (
            <p>Too short request</p>
          ) : !searchError && products.length === 0 ? (
            <p>No such product found. Try again</p>
          ) : (
            products.map((product: IProductData | IProductSearchResult) => (
              <CardComponent key={product.id} product={product} />
            ))
          )}
        </Box>
      </Container>
    </>
  );
};

export default Catalog;
