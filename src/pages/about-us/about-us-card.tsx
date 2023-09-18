import React, { useState } from "react";

import GitHab from "@assets/icons/gitHab.png";
import { CardData } from "@pages/about-us/about-us-data";
import styles from "@pages/about-us/about-us.module.scss";

import { Link } from "react-router-dom";

import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const AboutUsCard = ({ data }: { data: CardData }) => {
  // State to track when the modal is open
  const [isModalOpen, setModalOpen] = useState(false);

  // Open modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Card sx={{ width: 345 }}>
      <CardActionArea>
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <Avatar
          alt="Remy Sharp"
          src={data.imageSrc}
          sx={{ width: 300, height: 300, margin: "auto" }}
        />
        <CardContent>
          <Box textAlign="center">
            <Typography gutterBottom variant="h5" component="div">
              {data.name}
            </Typography>
          </Box>
          {data.jobTitle.map((title) => (
            <Typography variant="h6" color="text.secondary">
              {title}
            </Typography>
          ))}
          <CardActions>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Grid container justifyContent="center">
              <Button size="medium" color="success" onClick={openModal}>
                Learn More
              </Button>
            </Grid>
            <Modal open={isModalOpen} onClose={closeModal}>
              <Box
                className={styles.modal}
                style={isMobile ? { overflow: "auto" } : {}}
              >
                <div className={styles.cross}>
                  <CancelOutlinedIcon
                    fontSize="large"
                    className={styles.close}
                    onClick={closeModal}
                  />
                </div>
                <div
                  className={styles.header}
                  style={
                    isMobile
                      ? { flexDirection: "column" }
                      : { flexDirection: "row" }
                  }
                >
                  {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                  <Avatar
                    alt="Remy Sharp"
                    src={data.imageSrc}
                    sx={{
                      width: 100,
                      height: 100,
                      marginRight: 6,
                    }}
                  />
                  <div className={styles.name}>
                    <Typography gutterBottom variant="h4" component="div">
                      {data.name}
                    </Typography>

                    {data.jobTitle.map((title) => (
                      <Typography gutterBottom variant="h6">
                        {title}
                      </Typography>
                    ))}
                  </div>
                </div>
                <div className={styles.text}>
                  <Typography variant="body1">
                    <b>Skills:</b>
                    {data.skills.map((skill) => (
                      <Typography variant="body1">
                        <Typography variant="body1">{skill}</Typography>
                      </Typography>
                    ))}
                  </Typography>
                  <Typography variant="body1">
                    <b>Education:</b>
                    <Typography variant="body1">{data.education}</Typography>
                  </Typography>
                  <br />
                  <Typography variant="body1">
                    <b>Courses:</b>
                    <Typography variant="body1">
                      <ul>
                        {data.courses.map((course) => (
                          <li>
                            <Link
                              to={course.link}
                              target="_blank"
                              className={styles.link}
                            >
                              {course.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Typography>
                  </Typography>
                  <Typography variant="body1">
                    <b>English:</b>
                    <Typography variant="body1">{data.englishLevel}</Typography>
                  </Typography>
                  <br />
                  <Typography variant="body1">
                    <div style={{ display: "flex" }}>
                      <Link
                        to={data.githubProfile}
                        color="inherit"
                        className={styles.link}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "20px",
                        }}
                        target="_blank"
                      >
                        <Avatar
                          alt="Inesa photo"
                          src={GitHab}
                          sx={{ width: 40, height: 40 }}
                        />
                        <span>Link to the GitHub profile</span>
                      </Link>
                    </div>
                  </Typography>
                </div>
              </Box>
            </Modal>
          </CardActions>
        </CardContent>
      </CardActionArea>
      <Typography variant="body1" align="center">
        <b>Implemented functions:</b>
        {data.implemented.map((task) => (
          <Typography variant="body1">
            <ul>
              <li>{task}</li>
            </ul>
          </Typography>
        ))}
      </Typography>
    </Card>
  );
};
export default AboutUsCard;
