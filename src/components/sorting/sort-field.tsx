import React from "react";

import { ISortingFieldProps } from "@components/sorting/sort-field-props";

import { Box, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

import sortingOptions from "./sorting-options";

import styles from "./sortingField.module.scss";

const SortingField: React.FC<ISortingFieldProps> = ({
  sortingOption,
  setSortingOption,
}) => {
  return (
    <Box className={styles.sortingContainer}>
      <FormControl fullWidth size="small">
        <InputLabel id="sort-select-label">Sort by</InputLabel>
        <Select
          label="Sort by"
          value={sortingOption}
          onChange={(e) => setSortingOption(e.target.value)}
          displayEmpty
          className={styles.sortingSelect}
          variant="outlined"
          size="small"
        >
          {sortingOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortingField;
