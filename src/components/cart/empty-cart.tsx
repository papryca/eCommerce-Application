import { ReactComponent as EmptyImage } from "@assets/images/cart/empty-cart.svg";
import { Link } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";

import styles from "../../pages/cart/cart.module.scss";

const EmptyCart = () => {
  return (
    <Box className={styles.empty}>
      <EmptyImage />
      <Typography variant="h5" color="primary">
        Your cart is empty
      </Typography>
      <Link to="/catalog">
        <Button className="button" variant="contained" color="secondary">
          Go to catalog
        </Button>
      </Link>
    </Box>
  );
};

export default EmptyCart;
