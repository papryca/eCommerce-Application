import { useState } from "react";

import { Controller, useForm } from "react-hook-form";

import schemaPassword from "@constants/schema-password";
import { IPasswords } from "@interfaces/modal";

import { yupResolver } from "@hookform/resolvers/yup";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
} from "@mui/material";

import styles from "./modal.module.scss";

interface IPasswordEstimation {
  open: boolean;
  onClose: () => void;
}

const PasswordPopupEstimation = (props: IPasswordEstimation) => {
  const { open, onClose } = props;
  const {
    control,
    formState: { errors },
  } = useForm<IPasswords>({
    resolver: yupResolver(schemaPassword),
    mode: "onChange",
  });

  // State to toggle current password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  // Toggle current password visibility
  const handleToggleCurrentPassword = () =>
    setShowCurrentPassword((prevState) => !prevState);

  // State to toggle new password visibility
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Toggle password visibility
  const handleToggleNewPassword = () =>
    setShowNewPassword((prevState) => !prevState);

  // Cancel form submission
  const onCancel = () => {
    // eslint-disable-next-line no-restricted-globals
    event?.preventDefault();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} data-testid="password-modal">
      <Box
        className={styles.passModal}
        sx={{
          boxShadow: 24,
        }}
      >
        <form className={styles.form}>
          <Controller
            name="currentPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                data-testid="password-input"
                label="Current password"
                fullWidth
                variant="outlined"
                type={showCurrentPassword ? "text" : "password"}
                error={!!errors.currentPassword}
                helperText={errors.currentPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleToggleCurrentPassword}>
                        {showCurrentPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                  ...field,
                }}
              />
            )}
          />
          <Controller
            name="newPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="New password"
                fullWidth
                variant="outlined"
                type={showNewPassword ? "text" : "password"}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleToggleNewPassword}>
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  ...field,
                }}
              />
            )}
          />
          <Box className={styles.box}>
            <Button
              className={styles.passButton}
              type="submit"
              variant="contained"
              color="info"
            >
              Save
            </Button>
            <Button
              data-testid="calcel"
              className={styles.passButton}
              type="button"
              variant="contained"
              color="primary"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default PasswordPopupEstimation;
