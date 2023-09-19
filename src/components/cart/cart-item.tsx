import EventSystem from "@helpers/event-system";
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

    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const updateCartItems = cartItems.filter(
      (item: { productId: string }) => item.productId !== lineItem.productId
    );
    localStorage.setItem("cartItems", JSON.stringify(updateCartItems));
    EventSystem.onCartUpdate();
  };

  const discountPrice =
    // eslint-disable-next-line no-unsafe-optional-chaining
    lineItem.variant.prices[0].discounted?.value.centAmount * lineItem.quantity;
  const originalPrice =
    lineItem.variant.prices[0].value.centAmount * lineItem.quantity;
  const totalPrice = lineItem.totalPrice.centAmount;
  const promoApplied = totalPrice < (discountPrice || originalPrice);

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
      <Box className={styles.actions}>
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
        {discountPrice ? (
          <Box className={styles.discounted}>
            <Typography className={styles.originalPriceStriked}>
              <span>Original Price: </span>
              <span className={styles.price}>
                {(originalPrice / 100).toFixed()} $
              </span>
            </Typography>
            <Typography
              className={
                promoApplied
                  ? styles.discountedPriceStriked
                  : styles.discountedPrice
              }
            >
              <span>Discounted Price: </span>
              <span className={styles.price}>
                {(discountPrice / 100).toFixed()} $
              </span>
            </Typography>
            <Typography
              className={
                promoApplied ? styles.totalPricePromo : styles.totalPrice
              }
            >
              <span>Total Price: </span>
              <span className={styles.price}>
                {(totalPrice / 100).toFixed()} $
              </span>
            </Typography>
          </Box>
        ) : (
          <Box className={styles.discounted}>
            <Typography
              className={
                promoApplied
                  ? styles.originalPriceStriked
                  : styles.originalPrice
              }
            >
              <span>Original Price: </span>
              <span className={styles.price}>
                {(originalPrice / 100).toFixed()} $
              </span>
            </Typography>
            <Typography
              className={
                promoApplied ? styles.totalPricePromo : styles.totalPrice
              }
            >
              <span>Total Price: </span>
              <span className={styles.price}>
                {(totalPrice / 100).toFixed()} $
              </span>
            </Typography>
          </Box>
        )}
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
