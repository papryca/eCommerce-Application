import React from "react";

import { IFilterComponentProps } from "@components/filter/filter-props";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Slider,
  Box,
  Rating,
} from "@mui/material";

import countries from "./country-data";
import stars from "./stars-data";

import styles from "./filter.module.scss";

const FilterComponent: React.FC<IFilterComponentProps> = ({
  selectedCategory,
  onFilterChange,
  onCountryFilterChange,
  onCloseFilter,
  countryFilter,
  setCountryFilter,
  priceRange,
  setPriceRange,
  starRating,
  setStarRating,
}) => {
  // apply filters by country and price range
  const handleApplyFilters = () => {
    const newFilterCriteria: Record<string, string> = {};

    if (countryFilter !== "All") {
      newFilterCriteria["variants.attributes.country"] = `"${countryFilter}"`;
    }

    if (!countryFilter) {
      delete newFilterCriteria["variants.attributes.country"];
    }

    if (starRating !== "Any") {
      newFilterCriteria["variants.attributes.Star-Rating"] = `${starRating}`;
    }

    if (!starRating) {
      delete newFilterCriteria["variants.attributes.Star-Rating"];
    }

    const [minPrice, maxPrice] = priceRange;
    newFilterCriteria[
      "variants.price.centAmount"
    ] = `range(${minPrice} to ${maxPrice})`;

    if (selectedCategory) {
      newFilterCriteria["categories.id"] = `subtree("${selectedCategory}")`;
    }

    onFilterChange(newFilterCriteria);
    onCountryFilterChange(countryFilter);
    onCloseFilter();
  };

  // clears the filters
  const clearFilters = () => {
    const newFilterCriteria: Record<string, string> = {};

    if (selectedCategory) {
      newFilterCriteria["categories.id"] = `subtree("${selectedCategory}")`;
    }

    setCountryFilter("");
    setPriceRange([0, 300000]);
    setStarRating("");
    onFilterChange(newFilterCriteria);
    onCloseFilter();
  };

  return (
    <Box className={styles.filterContainer}>
      <FormControl fullWidth size="small">
        <InputLabel id="filter-select-label">Country</InputLabel>
        <Select
          className={styles.select}
          sx={{ mb: 5 }}
          labelId="filter-select-label"
          value={countryFilter}
          onChange={(event) => setCountryFilter(event.target.value)}
          label="Country"
          variant="outlined"
          size="small"
        >
          {countries.map((country) => (
            <MenuItem key={country.value} value={country.value}>
              {country.label}
            </MenuItem>
          ))}
        </Select>
        <Slider
          sx={{ width: 1 / 2, alignSelf: "center", mb: 2 }}
          className={styles.slider}
          value={priceRange}
          onChange={(event, newValue) => setPriceRange(newValue as number[])}
          valueLabelDisplay="on"
          aria-labelledby="range-slider"
          min={0}
          max={300000}
          valueLabelFormat={(value) => `${(value / 100).toFixed()}$`}
        />
      </FormControl>
      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel id="star-rating-label">Star Rating</InputLabel>
        <Select
          labelId="star-rating-label"
          label="Star Rating"
          value={starRating}
          onChange={(event) => {
            setStarRating(event.target.value || "Any");
          }}
          className={styles.starRatingSelect}
          variant="outlined"
          size="small"
        >
          {stars.map((star) => (
            <MenuItem key={star.value} value={star.value || "Any"}>
              {!star.value ? (
                star.label
              ) : (
                <Rating
                  name="star-rating"
                  value={Number(star.value)}
                  readOnly
                  size="small"
                />
              )}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box className={styles.buttonsContainer}>
        <Button onClick={handleApplyFilters} variant="outlined" color="success">
          Apply Filters
        </Button>
        <Button onClick={clearFilters} variant="outlined" color="error">
          Clear Filters
        </Button>
      </Box>
    </Box>
  );
};

export default FilterComponent;
