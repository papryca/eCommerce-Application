import React from "react";

import HeaderBurger from "@components/header/header-burger";
import HeaderDesktop from "@components/header/header-desktop";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import styles from "./header.module.scss";

const AppHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <header className={styles.header}>
      {isMobile ? <HeaderBurger /> : <HeaderDesktop />}
    </header>
  );
};
export default AppHeader;
