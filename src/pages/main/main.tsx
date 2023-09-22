import AppHeader from "@components/header/header";
// import HeaderRoute from "@components/header/header-route";
// import routes from "@components/header/tabs";
import { Link } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";
// import { Box, Button, Grid, Typography } from "@mui/material";

import styles from "./main.module.scss";

const Home = () => {
  // const items = [
  //   routes.aboutUs,
  //   routes.catalog,
  //   routes.cart,
  //   routes.login,
  //   routes.registration,
  //   routes.profile,
  // ];

  const activePromoCode = "RS-20";

  return (
    <>
      <AppHeader />

      <Box className={styles.container}>
        <div className={styles.promoCodeContainer}>
          <Typography variant="h4" className={styles.activePromoCode}>
            Sitewide sale
          </Typography>
          <Typography variant="h5" className={styles.activePromoCode}>
            your code: {activePromoCode}
          </Typography>
          <Link to="/catalog">
            <Button className="button" variant="contained" color="info">
              Shop now
            </Button>
          </Link>
        </div>
        {/* <Grid width="350px" className={styles.link} container spacing={2}>
          <Typography variant="h5">Or visit other pages</Typography>
          {items.map((item) => {
            return (
              <Grid item xs={12} key={item.index}>
                <HeaderRoute
                  to={item.link}
                  icon={item.icon}
                  label={item.label}
                />
              </Grid>
            );
          })}
        </Grid> */}
      </Box>
    </>
  );
};
export default Home;
