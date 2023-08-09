import CottageTwoToneIcon from "@mui/icons-material/CottageTwoTone";
import HowToRegTwoToneIcon from "@mui/icons-material/HowToRegTwoTone";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import React from "react";

interface IHeaderTab {
  index: number;
  icon: React.ReactElement;
  label: string;
  link: string;
}

const tabs: IHeaderTab[] = [
  {
    index: 1,
    icon: <CottageTwoToneIcon />,
    label: "HOME",
    link: "/",
  },
  {
    index: 2,
    icon: <LoginTwoToneIcon />,
    label: "LOGIN",
    link: "/login",
  },
  {
    index: 3,
    icon: <HowToRegTwoToneIcon />,
    label: "REGISTRATION",
    link: "/registration",
  },
];

export default tabs;
