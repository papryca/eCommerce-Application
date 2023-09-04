import React from "react";

import { ISearchFieldProps } from "@components/search/search-field-props";

import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField, Button } from "@mui/material";

import styles from "./searchField.module.scss";

const SearchField: React.FC<ISearchFieldProps> = ({
  searchQuery,
  setSearchQuery,
  searchHandler,
  isLoading,
}) => {
  return (
    <Box className={styles.searchContainer}>
      <TextField
        className={styles.searchField}
        label="Search products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        variant="outlined"
        size="small"
        fullWidth
        autoComplete="off"
        InputProps={{
          endAdornment: (
            <Button
              className={styles.searchButton}
              variant="contained"
              color="primary"
              onClick={searchHandler}
              startIcon={<SearchIcon />}
              disabled={isLoading}
              size="small"
              sx={{ minWidth: 100 }}
            >
              Search
            </Button>
          ),
        }}
      />
    </Box>
  );
};

export default SearchField;
