import React from "react";

import { IProductResponse } from "@interfaces/product-response";

import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

import styles from "./modal.module.scss";

const ProductEstimation = ({ product }: { product: IProductResponse }) => {
  interface Attribute {
    value: number;
  }
  const attribute: Attribute[] =
    product.masterData.current.masterVariant.attributes.filter(
      (attributeStar) => attributeStar.name === "Star-Rating"
    );
  const value: number | undefined = attribute[0]?.value;
  return (
    <div className={styles.estimation}>
      <Rating
        className={styles.stars}
        name="size-large"
        value={value}
        size="large"
        readOnly
      />
      <div className={styles.price}>
        <Typography variant="h4">
          {product.masterData.current.masterVariant.prices[0].discounted !==
            undefined &&
          product.masterData.current.masterVariant.prices[0].discounted.value
            .centAmount > 0 ? (
            <div className={styles.price}>
              <span
                style={{ textDecoration: "line-through" }}
                className={styles.noSale}
              >
                {(
                  parseFloat(
                    String(
                      product.masterData.current.masterVariant.prices[0].value
                        .centAmount
                    )
                  ) / 100
                ).toFixed(2)}{" "}
                USD
              </span>
              <span style={{ color: "red" }} className={styles.sale}>
                {(
                  parseFloat(
                    String(
                      product.masterData.current.masterVariant.prices[0]
                        .discounted.value.centAmount
                    )
                  ) / 100
                ).toFixed(2)}{" "}
                USD
              </span>
            </div>
          ) : (
            <>
              {(
                parseFloat(
                  String(
                    product.masterData.current.masterVariant.prices[0].value
                      .centAmount
                  )
                ) / 100
              ).toFixed(2)}{" "}
              USD
            </>
          )}
        </Typography>
      </div>
    </div>
  );
};

export default ProductEstimation;
