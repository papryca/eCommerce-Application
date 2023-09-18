/* eslint-disable no-console */
import React, { useState } from "react";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import axios from "axios";

import AppHeader from "@components/header/header";
import ModalType from "@constants/modal-type";

import convertFormDataToRegistrateData from "@helpers/convert-form-data";
import { ILoginData } from "@interfaces/login-form-data";
import { IRegisterFormData } from "@interfaces/registration-form-data";
import {
  // getTokenAndLogin,
  getTokenAndLoginAfterRegistrate,
  getTokenAndRegistrate,
} from "@services/authentication-service";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";

import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Modal,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import countries from "../../constants/countries";

import schemaRegister from "./schema-register";

import styles from "./registration.module.scss";

const today = new Date();
const minAge13 = 410240038000;
const dataDelta = today.getTime() - minAge13;

const Registration: React.FC = () => {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // State to toggle same shipping and billing addresses
  const [isOneAddressChecked, setOneAddressChecked] = React.useState(false);

  // State to toggle default shipping address
  const [shippingChecked, setShippingChecked] = React.useState(false);

  // State to toggle default billing address
  const [billingChecked, setBillingChecked] = React.useState(false);

  // States for modal popup
  const [isOpenModal, setModalOpen] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState("");
  const [modalType, setModalType] = React.useState(ModalType.INFO);

  // State to toggle disabled billing address
  const [isDisabled, setDisabled] = React.useState(false);

  // credentials for next login
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    setError,
  } = useForm<IRegisterFormData>({
    resolver: yupResolver(schemaRegister),
    mode: "onChange",
  });

  // Toggle password visibility
  const handleTogglePassword = () => setShowPassword((prevState) => !prevState);

  const onShippingChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setShippingChecked(event.target.checked);

  const onBillingChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setBillingChecked(event.target.checked);

  const bilingAdressUpdate = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setOneAddressChecked(event.target.checked);
    setDisabled(checked);

    const newBilingAdress = {
      street: "",
      city: "",
      country: "",
      code: "",
    };

    if (checked) {
      newBilingAdress.street = watch("shippingStreet");
      newBilingAdress.city = watch("shippingCity");
      newBilingAdress.country = watch("shippingCountry");
      newBilingAdress.code = watch("shippingPostcode");

      if (
        newBilingAdress.street.length !== 0 &&
        newBilingAdress.city.length !== 0 &&
        newBilingAdress.country.length !== 0 &&
        newBilingAdress.code.length !== 0
      ) {
        setValue("billingStreet", newBilingAdress.street);
        setValue("billingCity", newBilingAdress.city);
        setValue("billingCountry", newBilingAdress.country);
        setValue("billingPostcode", newBilingAdress.code);
      } else {
        setValue("billingStreet", "street");
        setValue("billingCity", "city");
        setValue("billingCountry", "AT");
        setValue("billingPostcode", "1111");
      }
    } else {
      setValue("billingStreet", "");
      setValue("billingCity", "");
      setValue("billingCountry", "");
      setValue("billingPostcode", "");
    }
  };

  const login = async (data: ILoginData) => {
    try {
      // const customerInfo = await getTokenAndLogin(data);
      const customerInfo = await getTokenAndLoginAfterRegistrate(data);

      console.log("Customer logged in successfully", customerInfo);
      navigate("/", { replace: true });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const showPopup = (type: ModalType, message: string) => {
    setModalType(type);
    setModalMessage(message);
    setModalOpen(true);
  };

  const handleClose = async () => {
    setModalOpen(false);

    if (modalType === ModalType.INFO) {
      await login(credentials);
    }
  };

  // Handle form submission
  const onSubmit: SubmitHandler<IRegisterFormData> = async (data) => {
    const user = convertFormDataToRegistrateData(
      data,
      isOneAddressChecked,
      billingChecked,
      shippingChecked
    );

    try {
      await getTokenAndRegistrate(user);
    } catch (error) {
      // Handle error messages from response
      if (axios.isAxiosError(error)) {
        const { response } = error;

        console.log("Error:", error.message);

        if (response?.data.errors) {
          showPopup(ModalType.ERROR, response.data.message);

          if (response?.status === 400) {
            setError("email", {
              type: "manual",
              message: "Choose another email",
            });
          }
          return;
        }
      } else {
        console.log("Error:", error);
      }

      return;
    }

    setCredentials({
      email: data.email,
      password: data.password,
    });
    showPopup(ModalType.INFO, "You are registrated successfully");
  };

  return (
    <>
      <AppHeader />
      <Box sx={{ display: "flex" }} className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" color="secondary">
            Login data
          </Typography>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Email"
                fullWidth
                error={!!errors.email}
                variant="outlined"
                helperText={errors.email?.message}
                InputProps={{
                  ...field,
                }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Password"
                fullWidth
                variant="outlined"
                type={showPassword ? "text" : "password"}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  ...field,
                }}
              />
            )}
          />
          <Typography variant="h6" color="secondary">
            Personal data
          </Typography>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="First name"
                fullWidth
                error={!!errors.firstName}
                variant="outlined"
                helperText={errors.firstName?.message}
                InputProps={{
                  ...field,
                }}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Last name"
                fullWidth
                error={!!errors.lastName}
                variant="outlined"
                helperText={errors.lastName?.message}
                InputProps={{
                  ...field,
                }}
              />
            )}
          />
          <Controller
            name="birthday"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => {
              const { value, onChange } = field;
              return (
                <DatePicker
                  label="Date of birth"
                  format="YYYY-MM-DD"
                  maxDate={dayjs(dataDelta)}
                  value={dayjs(value)}
                  onChange={(newValue) => onChange(newValue)}
                  slotProps={{
                    textField: {
                      required: true,
                      helperText: error?.message,
                    },
                  }}
                />
              );
            }}
          />
          <Typography variant="h6" color="secondary">
            Shipping address
          </Typography>
          <FormControlLabel
            name="shippingChecked"
            control={
              <Checkbox
                checked={shippingChecked}
                onChange={onShippingChange}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
              />
            }
            label="Make default shipping address"
          />
          <Controller
            name="shippingStreet"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Street"
                fullWidth
                error={!!errors.shippingStreet}
                variant="outlined"
                helperText={errors.shippingStreet?.message}
                InputProps={{
                  ...field,
                }}
              />
            )}
          />
          <Controller
            name="shippingCity"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="City"
                fullWidth
                error={!!errors.shippingCity}
                variant="outlined"
                helperText={errors.shippingCity?.message}
                InputProps={{
                  ...field,
                }}
              />
            )}
          />
          <Controller
            name="shippingCountry"
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
                      error={!!errors.shippingCountry}
                      helperText={errors.shippingCountry?.message}
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
            name="shippingPostcode"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Postal code"
                fullWidth
                error={!!errors.shippingPostcode}
                variant="outlined"
                helperText={errors.shippingPostcode?.message}
                InputProps={{
                  ...field,
                }}
              />
            )}
          />
          <Typography variant="h6" color="secondary">
            Billing address
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={isOneAddressChecked}
                onChange={bilingAdressUpdate}
              />
            }
            label="The same as shipping address"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={billingChecked}
                onChange={onBillingChange}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
              />
            }
            label="Make default billing address"
          />
          {!isDisabled && (
            <Controller
              name="billingStreet"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  disabled={isDisabled}
                  label="Street"
                  fullWidth
                  error={!!errors.billingStreet}
                  variant="outlined"
                  helperText={errors.billingStreet?.message}
                  InputProps={{
                    ...field,
                  }}
                />
              )}
            />
          )}
          {!isDisabled && (
            <Controller
              name="billingCity"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  disabled={isDisabled}
                  label="City"
                  fullWidth
                  error={!!errors.billingCity}
                  variant="outlined"
                  helperText={errors.billingCity?.message}
                  InputProps={{
                    ...field,
                  }}
                />
              )}
            />
          )}
          {!isDisabled && (
            <Controller
              name="billingCountry"
              control={control}
              defaultValue=""
              render={({ field }) => {
                const { value, onChange } = field;
                const country = value
                  ? countries.find((opt) => value === opt.value) ?? null
                  : null;
                return (
                  <Autocomplete
                    disabled={isDisabled}
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
                        error={!!errors.billingCountry}
                        helperText={errors.billingCountry?.message}
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
          )}
          {!isDisabled && (
            <Controller
              name="billingPostcode"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  disabled={isDisabled}
                  label="Postal code"
                  fullWidth
                  error={!!errors.billingPostcode}
                  variant="outlined"
                  helperText={errors.billingPostcode?.message}
                  InputProps={{
                    ...field,
                  }}
                />
              )}
            />
          )}
          <Button
            className="button"
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
        <Typography variant="h6">
          Already have an account?{" "}
          <Link className={styles.link} to="/login">
            Log in
          </Link>
        </Typography>
        <Modal open={isOpenModal} onClose={handleClose}>
          <Box
            className={styles.modal}
            sx={{
              boxShadow: 24,
            }}
          >
            <Typography variant="h6">{modalMessage}</Typography>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default Registration;
