import React from "react";

import { ReactComponent as LogoImage } from "@assets/icons/logo.svg";

import HeaderRoute from "@components/header/header-route";
import routes from "@components/header/tabs";

import { Link } from "react-router-dom";

import { Box } from "@mui/material";

const HeaderDesktop = () => {
  const hasToken = localStorage.getItem("tokenObject");
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Link to="/">
        <div style={{ width: "70px", height: "70px", marginLeft: "35px" }}>
          <LogoImage />
        </div>
      </Link>
      <Box display="flex" alignItems="center">
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
          <>
            <HeaderRoute
              to={routes.profile.link}
              icon={routes.profile.icon}
              label={routes.profile.label}
            />
            <HeaderRoute
              to={routes.logout.link}
              icon={routes.logout.icon}
              label={routes.logout.label}
            />
          </>
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
    </Box>
  );
};

export default HeaderDesktop;
