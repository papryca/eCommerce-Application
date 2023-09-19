/* eslint-disable no-console */
import React, { useEffect, useState } from "react";

import AddToCartButton from "@components/buttons/add-to-cart-btn";
import getValidAccessToken from "@helpers/check-token";
import calculateDiscount from "@helpers/claculate-discount";

import EventSystem from "@helpers/event-system";
import sliceText from "@helpers/slice-text";

import { ILineItem } from "@interfaces/line-item";
import { IProductSearchResult } from "@interfaces/product-search-result";
import { addProductToCart, getCart } from "@services/cart-services";

import { Link } from "react-router-dom";

import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import {
  CardMedia,
  CardContent,
  Typography,
  Chip,
  CardActions,
  Button,
  Card,
  Rating,
  Box,
} from "@mui/material";

import styles from "./card.module.scss";

interface ICardComponentProps {
  product: IProductSearchResult;
  cartItems: ILineItem[];
}

const CardComponent: React.FC<ICardComponentProps> = ({
  product,
  cartItems,
}) => {
  const [isInCart, setIsInCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = async (productId: string) => {
    try {
      setIsLoading(true);
      const accessToken = await getValidAccessToken();
      const currentCart = await getCart(accessToken.access_token);
      const currentCartId = currentCart.id;
      const currentCartVersion = currentCart.version;

      await addProductToCart(
        currentCartId,
        currentCartVersion,
        productId,
        accessToken.access_token
      );
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // handling adding product to cart
  const handleAddToCart = () => {
    try {
      addToCart(product.id).then();
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      cartItems.push({ productId: product.id });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      EventSystem.onCartUpdate();
      setIsInCart(true);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const originalPrice = product.masterVariant.prices[0].value.centAmount;
  const discountPrice =
    product.masterVariant.prices[0].discounted?.value.centAmount;

  // calculate discount
  const discountPercentage = calculateDiscount(originalPrice, discountPrice);

  // trim the discription of product
  const briefDescription = sliceText(product.description["en-US"], 150);
  const imageUrl = product.masterVariant.images[0].url;
  const productName = product.name["en-US"];
  const starRating = product.masterVariant.attributes.find(
    (attribute) => attribute.name === "Star-Rating"
  )?.value;

  useEffect(() => {
    const isProductInCart = cartItems.some(
      (item: ILineItem) => item.productId === product.id
    );
    setIsInCart(isProductInCart);
  }, [cartItems, product.id]);

  return (
    <Card className={styles.card}>
      <div className={styles.discountBadge}>
        {discountPercentage > 0 && (
          <div className={styles.badgeIcon}>
            <LocalOfferIcon className={styles.iconBadge} />
            <span
              className={styles.discountPercent}
            >{`-${discountPercentage}%`}</span>
          </div>
        )}
      </div>
      <CardMedia
        height="250"
        component="img"
        className={styles.image}
        image={imageUrl}
        alt={productName}
      />
      <CardContent className={styles.content}>
        <Typography variant="h6" color="secondary">
          {productName}
        </Typography>
        <Box className={styles.rating}>
          <Box className={styles.ratingText}>Hotel class:</Box>
          <Rating name="star-rating" value={Number(starRating)} readOnly />
        </Box>
        <Typography variant="body2">{briefDescription}</Typography>
        {discountPrice ? (
          <>
            <Typography className={styles.originalPriceStriked}>
              Price: {(originalPrice / 100).toFixed()} USD
            </Typography>
            <Typography className={styles.discountedPrice}>
              Discounted Price: {(discountPrice / 100).toFixed()} USD
            </Typography>
            <Chip
              component="span"
              size="small"
              variant="outlined"
              color="success"
              label="Lowest price"
            />
          </>
        ) : (
          <Typography className={styles.originalPrice}>
            Price: {(originalPrice / 100).toFixed()} USD
          </Typography>
        )}
        <CardActions className={styles.cardAction}>
          <Link to={`/catalog/${product.id}`} className={styles.link}>
            <Button
              className={styles.button}
              variant="contained"
              size="small"
              color="primary"
            >
              More
            </Button>
          </Link>
          <AddToCartButton
            isInCart={isInCart}
            handleAddToCart={handleAddToCart}
            isLoadingButton={isLoading}
          />
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
