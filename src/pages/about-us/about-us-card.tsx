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
    <Card
      sx={
        isMobile
          ? { width: 350, padding: "1em" }
          : { width: "37%", padding: "1em" }
      }
    >
      <Box>
        <Avatar
          alt={data.name}
          src={data.imageSrc}
          sx={{ width: 280, height: 280, margin: "auto" }}
        />
        <CardContent>
          <Box textAlign="center">
            <Typography gutterBottom variant="h5" component="div">
              {data.name}
            </Typography>
          </Box>
          {data.jobTitle.map((title) => (
            <Typography
              variant="h6"
              color="text.secondary"
              key={data.jobTitle.indexOf(title)}
            >
              {title}
            </Typography>
          ))}
          <CardActions>
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
                  <Avatar
                    alt={data.name}
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
                      <Typography
                        gutterBottom
                        variant="h6"
                        key={data.jobTitle.indexOf(title)}
                      >
                        {title}
                      </Typography>
                    ))}
                  </div>
                </div>
                <div className={styles.text}>
                  <Box>
                    <b>Skills:</b>
                    {data.skills.map((skill) => (
                      <Box key={data.skills.indexOf(skill)}>
                        <Typography variant="body1">{skill}</Typography>
                      </Box>
                    ))}
                  </Box>
                  <Box>
                    <b>Education:</b>
                    <Typography variant="body1">{data.education}</Typography>
                  </Box>
                  <br />
                  <Box>
                    <b>Courses:</b>
                    <Box>
                      <ul>
                        {data.courses.map((course) => (
                          <li key={data.courses.indexOf(course)}>
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
                    </Box>
                  </Box>
                  <Box>
                    <b>English:</b>
                    <Typography variant="body1">{data.englishLevel}</Typography>
                  </Box>
                  <br />
                  <Box>
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
                  </Box>
                </div>
              </Box>
            </Modal>
          </CardActions>
        </CardContent>
      </Box>
      <Box className={styles.implementedFunctionsContainer}>
        <b>Implemented functions:</b>
        {data.implemented.map((task) => (
          <Box key={data.implemented.indexOf(task)}>
            <ul>
              <li>
                <Typography variant="body1">{task}</Typography>
              </li>
            </ul>
          </Box>
        ))}
      </Box>
    </Card>
  );
};
export default AboutUsCard;
