import React from "react";

import { Link } from "react-router-dom";

import { Box, Icon, Typography } from "@mui/material";

import styles from "./header.module.scss";

export interface IHeaderRoute {
  to: string;
  icon: React.ReactNode;
  label: string;
}
const HeaderRoute: React.FC<IHeaderRoute> = ({ to, icon, label }) => {
  return (
    <Link to={to} className={styles.link} color="inherit">
      <Box display="flex" alignItems="center">
        <Icon
          aria-label={label}
          sx={{ marginRight: 1 }}
          style={{ overflow: "visible" }}
        >
          {icon}
        </Icon>
        <Typography variant="body1">{label}</Typography>
      </Box>
    </Link>
  );
};

export default HeaderRoute;
