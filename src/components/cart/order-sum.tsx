import { ICart } from "@interfaces/cart";

import { Box, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";

import styles from "../../pages/cart/cart.module.scss";

// eslint-disable-next-line import/no-named-as-default
import Promocode from "./promocode";

interface IOrderSumProps {
  version: number;
  setBasket: (cart: ICart) => void;
  disabled: boolean;
  basketId: string;
  basket: ICart;
}

const OrderSum = (props: IOrderSumProps) => {
  const { version, basketId, setBasket, disabled, basket } = props;
  const theme = useTheme();
  const large = useMediaQuery(theme.breakpoints.up("lg"));
  const medium = useMediaQuery(theme.breakpoints.up("md"));

  const totalPriceBeforeDiscount = basket.lineItems.reduce((total, item) => {
    const lineItemPrice = item.price.discounted
      ? item.price.discounted.value.centAmount
      : item.price.value.centAmount;
    return total + lineItemPrice * item.quantity;
  }, 0);

  let totalPriceWithDiscount = totalPriceBeforeDiscount;

  if (basket.discountCodes.length) {
    totalPriceWithDiscount = basket.totalPrice.centAmount;
  }

  const formattedTotalPriceBeforeDiscount = (
    totalPriceBeforeDiscount / 100
  ).toFixed();
  const formattedTotalPriceWithDiscount = (
    totalPriceWithDiscount / 100
  ).toFixed();

  return (
    <Paper className={styles.totalContainer}>
      <Box
        className={
          basket.discountCodes.length > 0 ? styles.totalStriked : styles.total
        }
      >
        <Typography variant={large || medium ? "h5" : "h6"} color="primary">
          Total:
        </Typography>
        <Typography variant={large || medium ? "h5" : "h6"} color="primary">
          {formattedTotalPriceBeforeDiscount} $
        </Typography>
      </Box>
      {basket.discountCodes.length > 0 && (
        <Box className={styles.total}>
          <Typography variant={large || medium ? "h4" : "h6"} color="secondary">
            Total With All Discounts:
          </Typography>
          <Typography variant={large || medium ? "h4" : "h6"} color="secondary">
            {formattedTotalPriceWithDiscount} $
          </Typography>
        </Box>
      )}
      <Promocode
        version={version}
        setBasket={setBasket}
        basketId={basketId}
        disabled={disabled}
        basket={basket}
      />
    </Paper>
  );
};

export default OrderSum;
