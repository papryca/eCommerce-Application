import { useState, useEffect } from "react";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import countries from "@constants/countries";
import schemaAddress from "@constants/schema-address";
import { IBaseAddress } from "@interfaces/registration-form-data";

import { yupResolver } from "@hookform/resolvers/yup";

import { Autocomplete, Box, Button, TextField } from "@mui/material";

import styles from "./forms.module.scss";

interface IAddressDataFormProps {
  address: IBaseAddress;
  version: number;
  setDefaultAddress: () => void;
  deleteAddress: () => void;
  defaultBtnDisabled: boolean;
  onParentSubmit: (address: IBaseAddress) => void;
}

const AddressDataForm = (addressData: IAddressDataFormProps) => {
  const {
    address,
    setDefaultAddress,
    deleteAddress,
    defaultBtnDisabled,
    onParentSubmit,
  } = addressData;
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
    const updatedFields = ["id", "country", "streetName", "postalCode", "city"];

    const setValues = () => {
      updatedFields.forEach((f: string) => {
        const fkey = f as keyof IBaseAddress;
        setValue(f as keyof IBaseAddress, address[fkey]);
      });
    };
    setValues();
  }, [setValue, address]);

  const [isAddressDisabled, setAddressDisabled] = useState(true);

  // Handle form submission
  const onSubmit: SubmitHandler<IBaseAddress> = (data) => {
    onParentSubmit(data);
    setAddressDisabled(true);
  };

  // switch edit mode
  const setEditMode = () => {
    // eslint-disable-next-line no-restricted-globals
    event?.preventDefault();
    setAddressDisabled(false);
  };

  const onDelete = () => {
    deleteAddress();
  };

  const setDefault = () => {
    setDefaultAddress();
  };

  return (
    <>
      <Box>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="streetName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                disabled={isAddressDisabled}
                label="Street"
                fullWidth
                error={!!errors.streetName}
                variant="outlined"
                helperText={errors.streetName?.message}
                InputProps={{
                  ...field,
                }}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#15528e",
                  },
                  "& .MuiInputBase-root.Mui-disabled": {
                    "& > fieldset": {
                      borderColor: "#15528e",
                    },
                  },
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
                disabled={isAddressDisabled}
                label="City"
                fullWidth
                error={!!errors.city}
                variant="outlined"
                helperText={errors.city?.message}
                InputProps={{
                  ...field,
                }}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#15528e",
                  },
                  "& .MuiInputBase-root.Mui-disabled": {
                    "& > fieldset": {
                      borderColor: "#15528e",
                    },
                  },
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
                  disabled={isAddressDisabled}
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
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#15528e",
                        },
                        "& .MuiInputBase-root.Mui-disabled": {
                          "& > fieldset": {
                            borderColor: "#15528e",
                          },
                        },
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
                disabled={isAddressDisabled}
                label="Postal code"
                fullWidth
                error={!!errors.postalCode}
                variant="outlined"
                helperText={errors.postalCode?.message}
                InputProps={{
                  ...field,
                }}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#15528e",
                  },
                  "& .MuiInputBase-root.Mui-disabled": {
                    "& > fieldset": {
                      borderColor: "#15528e",
                    },
                  },
                }}
              />
            )}
          />
          {isAddressDisabled ? (
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={setEditMode}
            >
              Edit
            </Button>
          ) : (
            <Button type="submit" variant="contained" color="info">
              Save
            </Button>
          )}
        </form>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }} className={styles.buttonContainer}>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          onClick={onDelete}
        >
          Delete
        </Button>
        <Button
          disabled={defaultBtnDisabled}
          type="button"
          variant="contained"
          color="primary"
          onClick={setDefault}
        >
          Set default
        </Button>
      </Box>
    </>
  );
};

export default AddressDataForm;
