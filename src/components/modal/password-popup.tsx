import { useState } from "react";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import schemaPassword from "@constants/schema-password";
import { IPasswordModal, IPasswords } from "@interfaces/modal";

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

const PasswordPopup = (props: IPasswordModal) => {
  const { open, onClose, onFormSubmit } = props;
  const {
    handleSubmit,
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

  // Handle form submission
  const onSubmit: SubmitHandler<IPasswords> = (data) => {
    onFormSubmit(data);
  };

  // Cancel form submission
  const onCancel = () => {
    // eslint-disable-next-line no-restricted-globals
    event?.preventDefault();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        className={styles.passModal}
        sx={{
          boxShadow: 24,
        }}
      >
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="currentPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
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

export default PasswordPopup;
