import { IInfoModal } from "@interfaces/modal";

import { Box, Modal, Typography } from "@mui/material";

import styles from "./modal.module.scss";

const InfoPopup = (props: IInfoModal) => {
  const { open, onClose, message } = props;
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        className={styles.modal}
        sx={{
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" color="primary">
          {message}
        </Typography>
      </Box>
    </Modal>
  );
};

export default InfoPopup;
