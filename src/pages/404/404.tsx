import { ReactComponent as ErrorImage } from "@assets/images/404/404.svg";
import { Link } from "react-router-dom";

import CottageTwoToneIcon from "@mui/icons-material/CottageTwoTone";
import Button from "@mui/material/Button";

import styles from "./404.module.scss";

const Page404 = () => {
  return (
    <div className={styles.image}>
      <ErrorImage />
      <div className={styles.error}>Page doesn't exist</div>
      <div className={styles.button}>
        <Link to="/">
          <Button
            variant="contained"
            size="large"
            endIcon={<CottageTwoToneIcon />}
          >
            Back to main page
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Page404;
