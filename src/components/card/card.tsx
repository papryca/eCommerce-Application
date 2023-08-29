import React from "react";

import calculateDiscount from "@helpers/claculate-discount";

import sliceText from "@helpers/slice-text";
import { ICardProps } from "@interfaces/card-props";
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
} from "@mui/material";

import styles from "./card.module.scss";

const CardComponent: React.FC<ICardProps> = ({ product }) => {
  const originalPrice =
    product.masterData.current.masterVariant.prices[0].value.centAmount;
  const discountPrice =
    product.masterData.current.masterVariant.prices[0].discounted?.value
      .centAmount;

  const discountPercentage = calculateDiscount(originalPrice, discountPrice);

  const briefDescription = sliceText(
    product.masterData.current.description["en-US"],
    150
  );

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
        image={product.masterData.current.masterVariant.images[0].url}
        alt={product.masterData.current.name["en-US"]}
      />
      <CardContent className={styles.content}>
        <Typography variant="h6">
          {product.masterData.current.name["en-US"]}
        </Typography>
        <Typography variant="body2">{briefDescription}</Typography>
        {product.masterData.current.masterVariant.prices[0].discounted
          ?.value ? (
          <>
            <Typography className={styles.originalPriceStriked}>
              Price:{" "}
              {product.masterData.current.masterVariant.prices[0].value
                .centAmount / 100}{" "}
              USD
            </Typography>
            <Typography className={styles.discountedPrice}>
              Discounted Price:{" "}
              {product.masterData.current.masterVariant.prices[0].discounted
                .value.centAmount / 100}{" "}
              USD
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
            Price:{" "}
            {product.masterData.current.masterVariant.prices[0].value
              .centAmount / 100}{" "}
            USD
          </Typography>
        )}
        <CardActions className={styles.cardAction}>
          <Link to={`/product/${product.id}`} className={styles.link}>
            <Button
              className={styles.button}
              variant="contained"
              size="small"
              color="primary"
            >
              More
            </Button>
          </Link>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
