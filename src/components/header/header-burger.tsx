import React, { useState } from "react";

import { ReactComponent as LogoImage } from "@assets/icons/logo.svg";
import HeaderRoute from "@components/header/header-route";
import routes from "@components/header/tabs";

import { Link } from "react-router-dom";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Drawer } from "@mui/material";

import styles from "./header.module.scss";

const HeaderBurger = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const hasToken = localStorage.getItem("tokenObject");
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Link to="/">
        <div className={styles.logo}>
          <LogoImage />
        </div>
      </Link>
      <MenuIcon onClick={toggleDrawer} />
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{
            width: 250,
            padding: 4,
            position: "relative",
          }}
        >
          <CloseIcon
            onClick={toggleDrawer}
            sx={{
              position: "absolute",
              top: "20px",
              right: "20px",
            }}
          />
          <HeaderRoute
            to={routes.home.link}
            icon={routes.home.icon}
            label={routes.home.label}
          />
          <HeaderRoute
            to={routes.catalog.link}
            icon={routes.catalog.icon}
            label={routes.catalog.label}
          />
          <HeaderRoute
            to={routes.cart.link}
            icon={routes.cart.icon}
            label={routes.cart.label}
          />
          {hasToken ? (
            <HeaderRoute
              to={routes.logout.link}
              icon={routes.logout.icon}
              label={routes.logout.label}
            />
          ) : (
            <>
              <HeaderRoute
                to={routes.registration.link}
                icon={routes.registration.icon}
                label={routes.registration.label}
              />
              <HeaderRoute
                to={routes.login.link}
                icon={routes.login.icon}
                label={routes.login.label}
              />
            </>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default HeaderBurger;
