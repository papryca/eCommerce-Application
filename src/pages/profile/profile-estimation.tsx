/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */

// import AddressesList from "@components/forms/addresses-list";
import { useState } from "react";

import PersonalDataFormEstimation from "@components/forms/personal-data-estimation";
// import makeAddressArray from "@helpers/make-address-array";
// import { IBaseAddress } from "@interfaces/registration-form-data";
import PasswordPopupEstimation from "@components/modal/password-popup-estimation";
import { IUserFullDataResponse } from "@interfaces/user-response";

import { Box } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import styles from "./profile.module.scss";

const ProfileEstimation = (props: {
  userData: IUserFullDataResponse;
  isDisabled: boolean;
}) => {
  const { userData, isDisabled } = props;

  // States and functions for reset-password-popup
  const [isOpenPasswordModal, setModalPasswordOpen] = useState(false);

  const showPasswordPopup = () => {
    setModalPasswordOpen(true);
  };

  const closePasswordPopup = () => {
    setModalPasswordOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex" }} className={styles.container}>
        <PersonalDataFormEstimation
          user={userData}
          isPersonalDataDisabled={isDisabled}
          onClickPassword={showPasswordPopup}
        />
        <PasswordPopupEstimation
          open={isOpenPasswordModal}
          onClose={closePasswordPopup}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default ProfileEstimation;
