/* eslint-disable jsx-a11y/anchor-is-valid */
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
  Link,
  Breadcrumbs,
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
  const [currentCategoryPath, setCurrentCategoryPath] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  // get category name using its id
  const getCategoryNameById = (
    categoryId: string,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    categories: Category[]
  ): string => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name["en-US"] : "";
  };

  // updating breadcrumps path
  const updateCurrentBreadcrumpPath = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (category) {
      setCurrentCategoryPath(
        category.ancestors
          .map((ancestor) => getCategoryNameById(ancestor.id, categories))
          .concat(category.name["en-US"])
      );
    }
  };

  // update breadcrumps when filtering by country
  const updateCurrentBreadcrumpPathByCountry = (country: string) => {
    setSelectedCountry(country);
    const categoryForCountry = categories.find(
      (c) => c.name["en-US"] === country
    );

    if (categoryForCountry) {
      const newCategoryPath = categoryForCountry.ancestors
        .map((ancestor) => getCategoryNameById(ancestor.id, categories))
        .concat(country);
      setCurrentCategoryPath(newCategoryPath);
    } else {
      setCurrentCategoryPath([]);
    }
  };

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
      updateCurrentBreadcrumpPath(
        filterCriteria["variants.attributes.country"]
      );
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

  // handle the click on breadcrump
  const handleBreadcrumbClick = (categoryName = "Catalog") => {
    const categoryId = categories.find(
      (c) => c.name["en-US"] === categoryName
    )?.id;
    if (categoryName === "Catalog") {
      setSelectedCategory(null);
      setCurrentCategoryPath([]);
      const newFilterCriteria: Record<string, string> = {};
      setFilterCriteria(newFilterCriteria);
      setSelectedCountry("");
    }

    if (categoryId) {
      const newFilterCriteria: Record<string, string> = {};
      newFilterCriteria["categories.id"] = `subtree("${categoryId}")`;
      setFilterCriteria(newFilterCriteria);
      setSelectedCategory(categoryId);
      updateCurrentBreadcrumpPath(categoryId);
    }
  };

  // handling click on category
  const handleCategoryClick = (
    event: React.MouseEvent<HTMLDivElement>,
    categoryId: string
  ) => {
    setSelectedCategory(categoryId);
    if (categoryId === selectedCategory) {
      setSelectedCategory(null);
      setCurrentCategoryPath([]);
    } else {
      const newFilterCriteria: Record<string, string> = {};
      newFilterCriteria["categories.id"] = ` subtree("${categoryId}")`;
      setFilterCriteria(newFilterCriteria);
      updateCurrentBreadcrumpPath(categoryId);
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
      selectedCategory ||
      selectedCountry
    ) {
      fetchFilteredAndSortedProducts();
      updateCurrentBreadcrumpPathByCountry(selectedCountry);
      updateCurrentBreadcrumpPath(selectedCategory || "");
    }
  }, [sortingOption, filterCriteria, selectedCategory, selectedCountry]);

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
        <Box mb={2}>
          <Breadcrumbs separator=" / ">
            <Link
              underline="hover"
              component="button"
              variant="body2"
              onClick={() => handleBreadcrumbClick()}
            >
              Catalog
            </Link>
            {currentCategoryPath.map((category) => (
              <Link
                underline="hover"
                key={category}
                component="button"
                variant="body2"
                onClick={() => handleBreadcrumbClick(category)}
              >
                {category}
              </Link>
            ))}
          </Breadcrumbs>
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
          onCountryFilterChange={setSelectedCountry}
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
