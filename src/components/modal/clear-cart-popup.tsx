import { Box, Button, Modal, Typography } from "@mui/material";

import styles from "./modal.module.scss";

interface IClearCartProps {
  open: boolean;
  onClose: () => void;
  clearCart: () => void;
}

const ClearCartPopup = (props: IClearCartProps) => {
  const { open, onClose, clearCart } = props;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        className={styles.passModal}
        sx={{
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" color="primary">
          Do you really want to remove all products?
        </Typography>
        <Box className={styles.box}>
          <Button
            className={styles.passButton}
            variant="contained"
            color="info"
            onClick={clearCart}
          >
            Confirm
          </Button>
          <Button
            className={styles.passButton}
            type="button"
            variant="contained"
            color="primary"
            onClick={onClose}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ClearCartPopup;
