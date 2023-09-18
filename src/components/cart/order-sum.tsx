import { ICart } from "@interfaces/cart";

import { Box, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";

import styles from "../../pages/cart/cart.module.scss";

import Promocode from "./promocode";

interface IOrderSumProps {
  price: number;
  version: number;
  setBasket: (cart: ICart) => void;
  disabled: boolean;
}

const OrderSum = (props: IOrderSumProps) => {
  const { price, version, setBasket, disabled } = props;
  const theme = useTheme();
  const large = useMediaQuery(theme.breakpoints.up("lg"));
  const medium = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Paper className={styles.totalContainer}>
      <Box className={styles.total}>
        <Typography variant={large || medium ? "h3" : "h4"} color="primary">
          Total:
        </Typography>
        <Typography variant={large || medium ? "h3" : "h4"} color="primary">
          {(price / 100).toFixed()} USD
        </Typography>
      </Box>
      <Promocode version={version} setBasket={setBasket} disabled={disabled} />
    </Paper>
  );
};

export default OrderSum;
