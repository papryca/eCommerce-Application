/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";

import axios from "axios";

import AddressesList from "@components/forms/addresses-list";
import PersonalDataForm from "@components/forms/personal-data-form";
import AppHeader from "@components/header/header";
import AddressPopup from "@components/modal/address-popup";
import InfoPopup from "@components/modal/info-popup";
import PasswordPopup from "@components/modal/password-popup";
import makeAddressArray from "@helpers/make-address-array";
import { ILoginData } from "@interfaces/login-form-data";
import { IPasswords } from "@interfaces/modal";
import { IBaseAddress } from "@interfaces/registration-form-data";
import {
  IUserFullDataResponse,
  IUserPersonalDataResponse,
} from "@interfaces/user-response";
import {
  IAddressUpdate,
  IPasswordUpdate,
  IUserUpdate,
} from "@interfaces/user-update";

import { getTokenAndLogin } from "@services/authentication-service";
import changePasswordRequest from "@services/change-password";
import getUser from "@services/get-user";

import userRequest from "@services/user-request";
import dayjs from "dayjs";
import { Navigate } from "react-router-dom";

import { Box } from "@mui/material";

import styles from "./profile.module.scss";

const Profile = () => {
  const hasToken = localStorage.getItem("tokenObject");

  if (!hasToken) {
    return <Navigate to="/login" />;
  }

  const [user, setUser] = useState({} as IUserFullDataResponse);
  const [personalData, setPersonalData] = useState(
    {} as IUserPersonalDataResponse
  );

  const [shippingAddresses, setShippingAddresses] = useState(
    [] as IBaseAddress[]
  );

  const [billingAddresses, setBillingAddresses] = useState(
    [] as IBaseAddress[]
  );

  // Get user data for page render
  const fetchUser = async () => {
    try {
      const response: IUserFullDataResponse = await getUser();
      setUser(response);

      setPersonalData(response);

      setShippingAddresses(
        makeAddressArray(response.addresses, response.shippingAddressIds)
      );
      setBillingAddresses(
        makeAddressArray(response.addresses, response.billingAddressIds)
      );
    } catch (error) {
      console.log("Error fetching user (in component render):", error);
    }
  };

  // States and functions for info modal popup
  const [isOpenInfoModal, setModalInfoOpen] = useState(false);
  const [infoModalMessage, setInfoModalMessage] = useState("");

  const showInfoPopup = (message: string) => {
    setInfoModalMessage(message);
    setModalInfoOpen(true);
  };

  const handleInfoModalClose = async () => {
    setModalInfoOpen(false);
  };

  // States and functions for reset-password-popup
  const [isOpenPasswordModal, setModalPasswordOpen] = useState(false);

  const showPasswordPopup = () => {
    setModalPasswordOpen(true);
  };

  const closePasswordPopup = () => {
    setModalPasswordOpen(false);
  };

  const login = async (data: ILoginData) => {
    let customerInfo;
    try {
      customerInfo = await getTokenAndLogin(data);

      console.log("Customer logged in successfully", customerInfo);
      return customerInfo;
    } catch (error) {
      console.log("Error:", error);
    }
    return customerInfo;
  };

  // update password on server
  const onPasswordSubmit = async (data: IPasswords) => {
    const { currentPassword, newPassword } = data;
    const { version } = user;

    closePasswordPopup();
    const dataObj: IPasswordUpdate = {
      version,
      currentPassword,
      newPassword,
    };

    try {
      await changePasswordRequest(dataObj);
      showInfoPopup("Password is updated successfully");

      // relogin
      const customerInfo = await login({
        email: user.email,
        password: newPassword,
      });
      if (customerInfo) {
        setUser(customerInfo);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showInfoPopup("The given current password does not match.");
      }
    }
  };

  // update personal data on server
  const onPersonalDataSubmit = async (data: IUserPersonalDataResponse) => {
    const { email, firstName, lastName, dateOfBirth } = data;
    const { version } = user;
    const birthDate = dayjs(dateOfBirth).format("YYYY-MM-DD");

    const dataObj: IUserUpdate = {
      version,
      actions: [
        {
          action: "setFirstName",
          firstName,
        },
        {
          action: "setLastName",
          lastName,
        },
        {
          action: "changeEmail",
          email,
        },
        {
          action: "setDateOfBirth",
          dateOfBirth: birthDate,
        },
      ],
    };

    let response;
    try {
      response = await userRequest(dataObj);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showInfoPopup(error.message);
        return;
      }
    }

    showInfoPopup("Data is updated successfully");
    setPersonalData(response);
    setUser(response);
  };

  const setDefaultAddress = async (
    id: string,
    action: string,
    version: number | undefined
  ) => {
    const upVersion = version ?? user.version;
    const dataObj: IUserUpdate = {
      version: upVersion,
      actions: [
        {
          action,
          addressId: id,
        },
      ],
    };

    try {
      await userRequest(dataObj);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showInfoPopup(error.message);
        return;
      }
    }

    showInfoPopup("Data is updated successfully");
    await fetchUser();
  };

  // Set default Shipping address
  const setDefaultShipping = async (
    id: string,
    version: number | undefined
  ) => {
    await setDefaultAddress(id, "setDefaultShippingAddress", version);
  };

  // Set default Billing address
  const setDefaultBilling = async (id: string, version: number | undefined) => {
    await setDefaultAddress(id, "setDefaultBillingAddress", version);
  };

  // Delete address from server
  const deleteAddress = async (id: string) => {
    const { version } = user;
    const dataObj: IUserUpdate = {
      version,
      actions: [
        {
          action: "removeAddress",
          addressId: id,
        },
      ],
    };

    try {
      await userRequest(dataObj);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showInfoPopup(error.message);
      }
    }

    showInfoPopup("Address is deleted successfully");
    await fetchUser();
  };

  // States and functions for address modal popup
  const [isOpenAddressModal, setModalAddressOpen] = useState(false);
  const [addressModalAction, setAddressModalAction] = useState("");

  const showShippingAddressPopup = () => {
    setModalAddressOpen(true);
    setAddressModalAction("addShippingAddressId");
  };

  const showBillingAddressPopup = () => {
    setModalAddressOpen(true);
    setAddressModalAction("addBillingAddressId");
  };

  const closeAddressPopup = () => {
    setModalAddressOpen(false);
  };

  // Add address to address-array on server
  const addAddress = async (address: IBaseAddress) => {
    const { version } = user;
    const dataObj: IAddressUpdate = {
      version,
      actions: [
        {
          action: "addAddress",
          address,
        },
      ],
    };

    let response;
    try {
      response = await userRequest(dataObj);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showInfoPopup(error.message);
      }
    }

    return {
      version: response.version,
      addressId: response.addresses[response.addresses.length - 1].id,
    };
  };

  // Add addressId to addressIds-array
  const addAddressId = async (addressId: string, version: number) => {
    const upVersion = version ?? user.version;
    const dataObj: IUserUpdate = {
      version: upVersion,
      actions: [
        {
          action: addressModalAction,
          addressId,
        },
      ],
    };

    let response;
    try {
      response = await userRequest(dataObj);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showInfoPopup(error.message);
      }
    }
    return response.version;
  };

  // handling click on "add address" button
  const onNewAddressSubmit = async (
    address: IBaseAddress,
    isDefault: boolean
  ) => {
    const { addressId, version } = await addAddress(address);
    const newVersion = await addAddressId(addressId, version);

    if (isDefault) {
      if (addressModalAction === "addShippingAddressId") {
        await setDefaultShipping(addressId, newVersion);
      } else {
        await setDefaultBilling(addressId, newVersion);
      }
    }

    showInfoPopup("Address is added successfully");
    closeAddressPopup();
    await fetchUser();
  };

  // update address
  const onEdit = async (addressId: string, address: IBaseAddress) => {
    const { version } = user;
    const dataObj: IAddressUpdate = {
      version,
      actions: [
        {
          action: "changeAddress",
          addressId,
          address,
        },
      ],
    };

    try {
      await userRequest(dataObj);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showInfoPopup(error.message);
      }
    }

    showInfoPopup("Address is updated successfully");
    await fetchUser();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <AppHeader />
      <Box sx={{ display: "flex" }} className={styles.container}>
        <PersonalDataForm
          user={personalData}
          onParentSubmit={onPersonalDataSubmit}
          showPasswordPopup={showPasswordPopup}
        />
        <AddressesList
          addresses={shippingAddresses ?? []}
          version={user.version}
          defaultAddressId={user.defaultShippingAddressId}
          typography="Shipping addresses"
          onSetDefault={setDefaultShipping}
          onDelete={deleteAddress}
          onAddAddress={showShippingAddressPopup}
          onEdit={onEdit}
        />
        <AddressesList
          addresses={billingAddresses ?? []}
          version={user.version}
          defaultAddressId={user.defaultBillingAddressId}
          typography="Billing addresses"
          onSetDefault={setDefaultBilling}
          onDelete={deleteAddress}
          onAddAddress={showBillingAddressPopup}
          onEdit={onEdit}
        />
        <InfoPopup
          open={isOpenInfoModal}
          onClose={handleInfoModalClose}
          message={infoModalMessage}
        />
        <PasswordPopup
          open={isOpenPasswordModal}
          onClose={closePasswordPopup}
          onFormSubmit={onPasswordSubmit}
        />
        <AddressPopup
          user={user}
          open={isOpenAddressModal}
          onClose={closeAddressPopup}
          onFormSubmit={onNewAddressSubmit}
        />
      </Box>
    </>
  );
};

export default Profile;
