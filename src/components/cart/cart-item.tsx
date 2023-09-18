// import { useState } from "react";

import { ILineItem } from "@interfaces/cart";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Box,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import styles from "../../pages/cart/cart.module.scss";

interface ICartItemProps {
  lineItem: ILineItem;
  changeProductQuantity: (id: string, quantity: number) => void;
  disabled: boolean;
}

const CartItem = (props: ICartItemProps) => {
  const theme = useTheme();
  const large = useMediaQuery(theme.breakpoints.up("lg"));
  const medium = useMediaQuery(theme.breakpoints.up("md"));

  const { lineItem, changeProductQuantity, disabled } = props;

  const decreaseQuantity = () => {
    const quantity = lineItem.quantity - 1;
    changeProductQuantity(lineItem.id, quantity);
  };

  const increaseQuantity = () => {
    const quantity = lineItem.quantity + 1;
    changeProductQuantity(lineItem.id, quantity);
  };

  const deleteProduct = () => {
    changeProductQuantity(lineItem.id, 0);
  };

  return (
    <Paper className={styles.paper} elevation={2}>
      <Typography
        variant={large || medium ? "subtitle1" : "subtitle2"}
        color="primary"
        className={styles.title}
      >
        {lineItem.productKey}
      </Typography>
      <img
        src={lineItem.variant.images[0].url}
        alt="hotel"
        className={styles.image}
      />
      <Box className={styles.price}>
        <Box className={styles.quantity}>
          <IconButton
            disabled={lineItem.quantity === 1 || disabled}
            onClick={decreaseQuantity}
            aria-label="delete"
          >
            <RemoveCircleIcon
              color={lineItem.quantity === 1 ? "disabled" : "primary"}
            />
          </IconButton>
          <input
            disabled
            type="number"
            min="1"
            value={lineItem.quantity}
            className={styles.input}
          />
          <IconButton
            disabled={disabled}
            onClick={increaseQuantity}
            aria-label="delete"
          >
            <AddCircleIcon color="secondary" />
          </IconButton>
        </Box>
        <Typography>
          {(lineItem.totalPrice.centAmount / 100).toFixed()} USD
        </Typography>
        <IconButton
          disabled={disabled}
          onClick={deleteProduct}
          className={styles.deleteBtn}
          aria-label="delete"
        >
          <DeleteForeverIcon color="info" />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default CartItem;
