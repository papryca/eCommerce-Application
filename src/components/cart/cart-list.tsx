import { ILineItem } from "@interfaces/cart";

import { Stack } from "@mui/material";

import styles from "../../pages/cart/cart.module.scss";

import CartItem from "./cart-item";

interface ICartListProps {
  products: ILineItem[];
  changeProductQuantity: (id: string, quantity: number) => void;
  disabled: boolean;
}

const CartList = (props: ICartListProps) => {
  const { products, changeProductQuantity, disabled } = props;
  const cartItems = products.map((product) => {
    return (
      <CartItem
        key={product.productId}
        lineItem={product}
        changeProductQuantity={changeProductQuantity}
        disabled={disabled}
      />
    );
  });

  return (
    <Stack spacing={2} className={styles.stack}>
      {cartItems}
    </Stack>
  );
};

export default CartList;
