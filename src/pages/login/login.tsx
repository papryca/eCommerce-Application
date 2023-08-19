/* eslint-disable no-console */
import React, { useState } from "react";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import axios from "axios";

import AppHeader from "@components/header/header";
import { ILoginFormData } from "@interfaces/login-form-data";

// import { ITokenResponse } from "@interfaces/token-response";
import {
  obtainAccessTokenPassFlow,
  loginCustomer,
} from "@services/commerce-tools-service";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

import schemaLogin from "./schema-login";

import styles from "./login.module.scss";

const Login: React.FC = () => {
  const navigate = useNavigate();

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<ILoginFormData>({
    resolver: yupResolver(schemaLogin),
    mode: "onChange",
  });

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Handle form submission
  const onSubmit: SubmitHandler<ILoginFormData> = async (data) => {
    try {
      const tokenObject = await obtainAccessTokenPassFlow(
        data.email,
        data.password
      );
      localStorage.setItem("tokenObject", JSON.stringify(tokenObject));

      const customerInfo = await loginCustomer(
        tokenObject.access_token,
        data.email,
        data.password
      );

      console.log("Customer logged in successfully", customerInfo);

      navigate("/", { replace: true });
    } catch (error) {
      // Handle error messages from response
      if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response?.data.errors) {
          const errorMessage = response.data.message;

          setError("email", { type: "manual", message: errorMessage });
          setError("password", { type: "manual", message: errorMessage });
        } else {
          console.log("Error:", error.message);
        }
      } else {
        console.log("Error:", error);
      }
    }
  };

  return (
    <>
      <AppHeader />
      <Box className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
                  autoComplete: "off",
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
                  autoComplete: "off",
                }}
              />
            )}
          />
          <Button
            className="button"
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Login;
