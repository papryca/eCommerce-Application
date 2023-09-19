import React from "react";

import AppHeader from "@components/header/header";
import HeaderRoute from "@components/header/header-route";
import routes from "@components/header/tabs";

import { Grid, Typography } from "@mui/material";

import styles from "./main.module.scss";

const Home = () => {
  const items = [
    routes.aboutUs,
    routes.catalog,
    routes.cart,
    routes.login,
    routes.registration,
    routes.profile,
  ];

  const activePromoCode = "RS-20";

  return (
    <>
      <AppHeader />
      <Grid className={styles.link} container spacing={2}>
        {items.map((item) => {
          return (
            <Grid item xs={12} key={item.index}>
              <HeaderRoute to={item.link} icon={item.icon} label={item.label} />
            </Grid>
          );
        })}
      </Grid>
      <div className={styles.promoCodeContainer}>
        <Typography variant="body1" className={styles.activePromoCode}>
          Activate Promo Code in Cart:{" "}
          <span className={styles.promoCode}>{activePromoCode}</span>
        </Typography>
      </div>
    </>
  );
};
export default Home;
