import { useEffect, useState } from "react";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import countries from "@constants/countries";
import schemaAddress from "@constants/schema-address";

import { IBaseAddress } from "@interfaces/registration-form-data";

import { IUserPersonalDataResponse } from "@interfaces/user-response";

import { yupResolver } from "@hookform/resolvers/yup";

import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  TextField,
} from "@mui/material";

import styles from "./modal.module.scss";

interface IAddressModal {
  user: IUserPersonalDataResponse;
  open: boolean;
  onClose: () => void;
  onFormSubmit: (data: IBaseAddress, isDefault: boolean) => void;
}

const AddressPopup = (addressData: IAddressModal) => {
  const { open, onClose, onFormSubmit, user } = addressData;
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<IBaseAddress>({
    resolver: yupResolver(schemaAddress),
    mode: "onChange",
  });

  useEffect(() => {
    ["country", "streetName", "postalCode", "city"].forEach((key) => {
      const fkey = key as keyof IBaseAddress;
      setValue(fkey, "");
    });
  }, [setValue, user.version]);

  // State for default address
  const [isDefaultChecked, setModalAddressOpen] = useState(false);

  const onDefaultChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setModalAddressOpen(event.target.checked);

  // Handle form submission
  const onSubmit: SubmitHandler<IBaseAddress> = (data) => {
    onFormSubmit(data, isDefaultChecked);
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
            name="streetName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Street"
                fullWidth
                error={!!errors.streetName}
                variant="outlined"
                helperText={errors.streetName?.message}
                InputProps={{
                  ...field,
                }}
              />
            )}
          />
          <Controller
            name="city"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="City"
                fullWidth
                error={!!errors.city}
                variant="outlined"
                helperText={errors.city?.message}
                InputProps={{
                  ...field,
                }}
              />
            )}
          />
          <Controller
            name="country"
            control={control}
            defaultValue=""
            render={({ field }) => {
              const { value, onChange } = field;
              const country = value
                ? countries.find((opt) => value === opt.value) ?? null
                : null;
              return (
                <Autocomplete
                  value={country}
                  options={countries}
                  onChange={(event, newValue) => {
                    onChange(newValue ? newValue.value : null);
                  }}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      {option.label}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose a country"
                      error={!!errors.country}
                      helperText={errors.country?.message}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password",
                      }}
                    />
                  )}
                />
              );
            }}
          />
          <Controller
            name="postalCode"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Postal code"
                fullWidth
                error={!!errors.postalCode}
                variant="outlined"
                helperText={errors.postalCode?.message}
                InputProps={{
                  ...field,
                }}
              />
            )}
          />
          <FormControlLabel
            name="defaultChecked"
            control={
              <Checkbox
                checked={isDefaultChecked}
                onChange={onDefaultChange}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
              />
            }
            label="Make default address"
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

export default AddressPopup;
