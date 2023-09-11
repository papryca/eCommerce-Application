/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import schemaPersonalData from "@constants/schema-personal-data";
import { IUserPersonalDataResponse } from "@interfaces/user-response";

import dayjs from "dayjs";

import { yupResolver } from "@hookform/resolvers/yup";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Button, TextField, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import styles from "./forms.module.scss";

const today = new Date();
const minAge13 = 410240038000;
const dataDelta = today.getTime() - minAge13;

interface IPersonalDataFormEstimationProps {
  user: IUserPersonalDataResponse;
  isPersonalDataDisabled: boolean;
  onClickPassword: () => void;
}

const PersonalDataFormEstimation = (
  props: IPersonalDataFormEstimationProps
) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<IUserPersonalDataResponse>({
    resolver: yupResolver(schemaPersonalData),
    mode: "onChange",
  });

  const { user, isPersonalDataDisabled, onClickPassword } = props;

  useEffect(() => {
    const updatedFields = ["email", "firstName", "lastName", "dateOfBirth"];
    const setValues = () => {
      updatedFields.forEach((f: string) => {
        const fkey = f as keyof IUserPersonalDataResponse;
        setValue(f as keyof IUserPersonalDataResponse, user[fkey]);
      });
    };
    setValues();
  }, [setValue, user]);

  const onSubmit: SubmitHandler<IUserPersonalDataResponse> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <Accordion data-testid="accordion">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography align="center" variant="h6" color="secondary">
          Personal data
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form
          data-testid="form"
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                disabled={isPersonalDataDisabled}
                label="Email"
                fullWidth
                error={!!errors.email}
                variant="outlined"
                helperText={errors.email?.message}
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
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                disabled={isPersonalDataDisabled}
                label="First name"
                fullWidth
                error={!!errors.firstName}
                variant="outlined"
                helperText={errors.firstName?.message}
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
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                disabled={isPersonalDataDisabled}
                label="Last name"
                fullWidth
                error={!!errors.lastName}
                variant="outlined"
                helperText={errors.lastName?.message}
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
            name="dateOfBirth"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => {
              const { value, onChange } = field;
              return (
                <DatePicker
                  disabled={isPersonalDataDisabled}
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
              );
            }}
          />
          {isPersonalDataDisabled ? (
            <Button
              className="big-button"
              type="button"
              variant="contained"
              color="primary"
            >
              Edit
            </Button>
          ) : (
            <Button
              className="big-button"
              type="submit"
              variant="contained"
              color="info"
            >
              Save
            </Button>
          )}
        </form>
        <Button
          data-testid="password"
          onClick={onClickPassword}
          className="big-button"
          type="button"
          variant="contained"
          color="info"
        >
          reset password
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default PersonalDataFormEstimation;
