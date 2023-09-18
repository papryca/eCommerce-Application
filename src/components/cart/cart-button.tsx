import React from "react";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Button from "@mui/material/Button";

import styles from "./cart-button.module.scss";

const CartButton = ({
  active,
  clickCallback,
}: {
  active: boolean;
  clickCallback: () => void;
}) => {
  return (
    <div className={styles.cart}>
      <Button
        variant="contained"
        size="large"
        endIcon={<ShoppingCartOutlinedIcon />}
        onClick={() => {
          clickCallback();
        }}
        disabled={active}
      >
        Add to cart
      </Button>
    </div>
  );
};
export default CartButton;
