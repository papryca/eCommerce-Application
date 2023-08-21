import React from "react";

import AppHeader from "@components/header/header";
import HeaderRoute from "@components/header/header-route";
import routes from "@components/header/tabs";

import { Grid } from "@mui/material";

import styles from "./main.module.scss";

const Home = () => {
  const items = [
    routes.catalog,
    routes.cart,
    routes.login,
    routes.registration,
  ];

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
    </>
  );
};
export default Home;
