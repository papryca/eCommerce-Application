/* eslint-disable no-nested-ternary */
import React from "react";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";

interface AddToCartButtonProps {
  isInCart: boolean;
  handleAddToCart: () => void;
  isLoadingButton: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  isInCart,
  handleAddToCart,
  isLoadingButton,
}) => {
  return (
    <Button
      variant="contained"
      size="small"
      color={isInCart ? "secondary" : "success"}
      onClick={handleAddToCart}
      startIcon={<ShoppingCartIcon />}
      disabled={isInCart || isLoadingButton}
    >
      {isLoadingButton ? (
        <CircularProgress size={20} color="inherit" />
      ) : isInCart ? (
        "Added"
      ) : (
        "Add to Cart"
      )}
    </Button>
  );
};

export default AddToCartButton;
