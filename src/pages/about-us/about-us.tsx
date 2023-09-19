import React from "react";

import RsSchool from "@assets/icons/rs-school.svg";
import Header from "@components/header/header";

import AboutUsCard from "@pages/about-us/about-us-card";
import cardsData from "@pages/about-us/about-us-data";
import TeamCollaboration from "@pages/about-us/team-collaboration";
import { Link } from "react-router-dom";

import { Typography } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import styles from "./about-us.module.scss";

const AboutUsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <div>
      <Header />
      <Typography variant="h3" gutterBottom align="center">
        Team
      </Typography>
      <div
        className={styles.aboutAs}
        style={
          isMobile
            ? { flexDirection: "column", alignItems: "center" }
            : { flexDirection: "row" }
        }
      >
        {cardsData.map((data) => (
          <AboutUsCard data={data} key={data.name} />
        ))}
      </div>
      <TeamCollaboration />
      <Link
        to="https://rs.school/js/"
        target="_blank"
        className={styles.schoolLink}
      >
        <img src={RsSchool} alt="RsSchool Course" className={styles.school} />
      </Link>
    </div>
  );
};
export default AboutUsPage;
