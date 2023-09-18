import React from "react";

import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";

interface RemoveFromCartButtonProps {
  isInCart: boolean;
  handleRemoveFromCart: () => void;
  isLoadingButton: boolean;
}
const RemoveFromCartButton: React.FC<RemoveFromCartButtonProps> = ({
  isInCart,
  handleRemoveFromCart,
  isLoadingButton,
}) => {
  return (
    <div>
      <Button
        variant="contained"
        size="small"
        color={isInCart ? "secondary" : "success"}
        onClick={handleRemoveFromCart}
        startIcon={<RemoveShoppingCartIcon />}
        disabled={!isInCart || isLoadingButton}
        style={{ marginTop: "10px", width: "100%" }}
      >
        {isLoadingButton ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          "Remove from Cart"
        )}
      </Button>
    </div>
  );
};

export default RemoveFromCartButton;
