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
import getValidAccessToken from "@helpers/check-token";
import { Category } from "@interfaces/category";
import { ILineItem } from "@interfaces/line-item";
import { IProductSearchResult } from "@interfaces/product-search-result";
import { getCart } from "@services/cart-services";
import getCategories from "@services/get-categories-by-id";
import getFilteredAndSortedProducts from "@services/get-filtered-and-sorted";

import SortByAlphaRoundedIcon from "@mui/icons-material/SortByAlphaRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import {
  Container,
  Box,
  CircularProgress,
  Typography,
  Stack,
  Link,
  Breadcrumbs,
  Drawer,
  IconButton,
  Badge,
  Pagination,
} from "@mui/material";

import styles from "./catalog.module.scss";

const Catalog = () => {
  const [products, setProducts] = useState<IProductSearchResult[]>([]);
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [areFiltersApplied, setAreFiltersApplied] = useState(false);
  const [countryFilter, setCountryFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [starRating, setStarRating] = useState("");
  const [cartItems, setCartItems] = useState<ILineItem[]>([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

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

  // handling page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    const newOffset = (page - 1) * cardsPerPage;
    setOffset(newOffset);
  };

  // fetching products with filters and/or sorting applied
  const fetchFilteredAndSortedProducts = useCallback(async () => {
    try {
      setSearchError(false);
      setIsLoading(true);

      const response = await getFilteredAndSortedProducts(
        filterCriteria,
        sortingOption,
        searchQuery,
        cardsPerPage,
        offset
      );
      setProducts(response.results);
      setTotal(response.total);
      updateCurrentBreadcrumpPath(
        filterCriteria["variants.attributes.country"]
      );

      let filtersApplied;

      switch (true) {
        case Object.keys(filterCriteria).length === 0:
          filtersApplied = false;
          break;
        case Object.keys(filterCriteria).some(
          (key) =>
            key === "variants.price.centAmount" &&
            filterCriteria[key] !== "range(0 to 300000)"
        ):
          filtersApplied = true;
          break;
        case Object.keys(filterCriteria).some(
          (key) =>
            key === "variants.attributes.country" ||
            key === "variants.attributes.Star-Rating"
        ):
          filtersApplied = true;
          break;
        default:
          filtersApplied = false;
      }
      setAreFiltersApplied(filtersApplied);
      setIsLoading(false);
    } catch (error) {
      setSearchError(true);
      console.error("Error fetching products:", error);
      setIsLoading(false);
    }
  }, [searchQuery, sortingOption, filterCriteria, cardsPerPage, offset]);

  // fetching categories from api
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
    setOffset(0);
    setCurrentPage(1);
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
    setOffset(0);
    setCurrentPage(1);
    setSelectedCategory(categoryId);
    // setIsCategoryFilterApplied(true);
    if (categoryId === selectedCategory) {
      setSelectedCategory(null);
      setCurrentCategoryPath([]);
    } else {
      const newFilterCriteria: Record<string, string> = {};
      newFilterCriteria["categories.id"] = ` subtree("${categoryId}")`;
      setFilterCriteria(newFilterCriteria);
      updateCurrentBreadcrumpPath(categoryId);
      setCountryFilter("");
      setPriceRange([0, 300000]);
      setStarRating("");
    }
  };

  useEffect(() => {
    // Fetch the cart items and update state
    const fetchCartItems = async () => {
      try {
        const accessToken = await getValidAccessToken();
        const currentCart = await getCart(accessToken.access_token);
        setCartItems(currentCart.lineItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  // handle fetching, filtering, sorting, and searching based on dependencies
  useEffect(() => {
    if (!selectedCategory) {
      delete filterCriteria["categories.id"];
      fetchFilteredAndSortedProducts();
      updateCurrentBreadcrumpPathByCountry(selectedCountry);
      updateCurrentBreadcrumpPath(selectedCategory || "");
    } else if (
      sortingOption ||
      Object.keys(filterCriteria).length > 0 ||
      selectedCategory ||
      selectedCountry
    ) {
      fetchFilteredAndSortedProducts();
      updateCurrentBreadcrumpPathByCountry(selectedCountry);
      updateCurrentBreadcrumpPath(selectedCategory || "");
    }
  }, [
    sortingOption,
    filterCriteria,
    selectedCategory,
    selectedCountry,
    cardsPerPage,
    offset,
  ]);

  return (
    <>
      <AppHeader />
      <Container className={styles.catalogContainer}>
        <Box>
          <Typography mb={1}>Categories:</Typography>
          <Stack direction="row" spacing={1} pb={2} sx={{ overflow: "auto" }}>
            <CategoryNavigation
              categories={categories}
              selectedCategory={selectedCategory}
              onClick={handleCategoryClick}
            />
          </Stack>
        </Box>
        <Box mb={1}>
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
        <Box className={styles.sortFilterConatiner}>
          <IconButton
            className={styles.IconButton}
            onClick={() => setIsFilterOpen(true)}
          >
            <Badge
              badgeContent={areFiltersApplied ? "!" : null}
              color="error"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <TuneRoundedIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={styles.IconButton}
            onClick={() => setIsSortOpen(true)}
          >
            <SortByAlphaRoundedIcon />
          </IconButton>
        </Box>
        <Drawer
          anchor="bottom"
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        >
          <FilterComponent
            onFilterChange={setFilterCriteria}
            selectedCategory={selectedCategory}
            onCountryFilterChange={setSelectedCountry}
            onCloseFilter={() => setIsFilterOpen(false)}
            countryFilter={countryFilter}
            setCountryFilter={setCountryFilter}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            starRating={starRating}
            setStarRating={setStarRating}
          />
        </Drawer>
        <Drawer
          anchor="bottom"
          open={isSortOpen}
          onClose={() => setIsSortOpen(false)}
        >
          <SortingField
            sortingOption={sortingOption}
            setSortingOption={setSortingOption}
            onCloseSort={() => setIsSortOpen(false)}
          />
        </Drawer>
        <Box className={styles.container}>
          {isLoading ? (
            <CircularProgress />
          ) : searchError ? (
            <p>Too short request</p>
          ) : !searchError &&
            products.length === 0 &&
            (searchQuery || Object.keys(filterCriteria).length > 0) ? (
            <p>No such product found. Try again</p>
          ) : (
            products.map((product: IProductSearchResult) => (
              <CardComponent
                key={product.id}
                product={product}
                cartItems={cartItems}
              />
            ))
          )}
        </Box>
        <Box className={styles.paginationContainer}>
          <Stack spacing={2} mt={2} mb={2}>
            <Pagination
              className={styles.pagination}
              count={Math.ceil(total / cardsPerPage)}
              page={currentPage}
              variant="outlined"
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
              boundaryCount={2}
            />
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default Catalog;
