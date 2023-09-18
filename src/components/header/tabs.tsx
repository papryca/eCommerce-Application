import React from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CottageTwoToneIcon from "@mui/icons-material/CottageTwoTone";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import HowToRegTwoToneIcon from "@mui/icons-material/HowToRegTwoTone";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

interface IHeaderRoute {
  index: number;
  icon: React.ReactElement;
  label: string;
  link: string;
}

type RouteDictionary = Record<string, IHeaderRoute>;

const routes: RouteDictionary = {
  home: {
    index: 1,
    icon: <CottageTwoToneIcon />,
    label: "HOME",
    link: "/",
  },
  login: {
    index: 2,
    icon: <LoginTwoToneIcon />,
    label: "LOGIN",
    link: "/login",
  },
  registration: {
    index: 3,
    icon: <HowToRegTwoToneIcon />,
    label: "REGISTRATION",
    link: "/registration",
  },
  logout: {
    index: 4,
    icon: <LogoutIcon />,
    label: "LOGOUT",
    link: "/logout",
  },
  catalog: {
    index: 5,
    icon: <ShoppingBagOutlinedIcon />,
    label: "CATALOG",
    link: "/catalog",
  },
  cart: {
    index: 6,
    icon: <ShoppingCartOutlinedIcon />,
    label: "CART",
    link: "/cart",
  },
  profile: {
    index: 7,
    icon: <AccountCircleIcon />,
    label: "PROFILE",
    link: "/profile",
  },
  aboutUs: {
    index: 8,
    icon: <Diversity3Icon />,
    label: "About us",
    link: "/about-us",
  },
};

export default routes;
