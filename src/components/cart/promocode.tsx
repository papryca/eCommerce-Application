/* eslint-disable no-console */
import { useState } from "react";

import { ICart } from "@interfaces/cart";

import { applyPromoCode } from "@services/cart-services";

import { Button, TextField } from "@mui/material";

import styles from "../../pages/cart/cart.module.scss";

interface IPromocodeProps {
  version: number;
  setBasket: (cart: ICart) => void;
  disabled: boolean;
  basketId: string;
  basket: ICart;
}

const Promocode = (props: IPromocodeProps) => {
  const { version, setBasket, disabled, basketId, basket } = props;
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [helperText, setHelperText] = useState("");

  const handleApplyPromoCode = async () => {
    try {
      if (basket.discountCodes && basket.discountCodes.length > 0) {
        console.log("Promo code is already applied.");
        setErrorMessage("Promo code is already applied");
        return;
      }

      const response = await applyPromoCode(basketId, version, promoCode);

      if (response) {
        setBasket(response);
        setPromoApplied(true);
        setHelperText("Promo code applied successfully!");
        console.log(promoCode);
        setPromoCode("");
        setErrorMessage("");
      }
    } catch (error) {
      if (
        (error as { response: { data: { message: string } } }).response &&
        (error as { response: { data: { message: string } } }).response.data &&
        (error as { response: { data: { message: string } } }).response.data
          .message
      ) {
        const promoCodeErrorMessage = (
          error as { response: { data: { message: string } } }
        ).response.data.message;
        if (promoCodeErrorMessage.includes("The discount code")) {
          setErrorMessage(promoCodeErrorMessage);
        }
      }
      setPromoApplied(false);
      setHelperText("");
    }
  };

  return (
    <form className={styles.promocode}>
      <TextField
        className={styles.promoText}
        variant="outlined"
        label="Promo Code"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
        error={!!errorMessage}
        helperText={errorMessage || (promoApplied && helperText)}
      />
      <Button
        disabled={disabled}
        className={styles.promoBtn}
        variant="contained"
        color="info"
        onClick={handleApplyPromoCode}
      >
        Apply promo code
      </Button>
    </form>
  );
};

export default Promocode;
