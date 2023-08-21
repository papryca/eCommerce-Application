import {
  IRegisterFormData,
  IRegistrateData,
  IBaseAddress,
} from "@interfaces/registration-form-data";
import dayjs from "dayjs";

const convertFormDataToRegistrateData = (
  data: IRegisterFormData,
  oneAddressChecked: boolean,
  billingChecked: boolean,
  shippingChecked: boolean
): IRegistrateData => {
  const billingAdress: IBaseAddress | null = oneAddressChecked
    ? null
    : {
        country: data.billingCountry,
        streetName: data.billingStreet,
        postalCode: data.billingPostcode,
        city: data.billingCity,
      };
  const shippingAdress: IBaseAddress = {
    country: data.shippingCountry,
    streetName: data.shippingStreet,
    postalCode: data.shippingPostcode,
    city: data.shippingCity,
  };
  const user: IRegistrateData = {
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: dayjs(data.birthday).format("YYYY-MM-DD"),
    addresses: billingAdress
      ? [billingAdress, shippingAdress]
      : [shippingAdress],
    billingAddresses: [0],
    shippingAddresses: oneAddressChecked ? [0] : [1],
  };

  if (billingChecked) {
    user.defaultBillingAddress = 0;
  }

  if (shippingChecked) {
    user.defaultShippingAddress = oneAddressChecked ? 0 : 1;
  }

  return user;
};

export default convertFormDataToRegistrateData;
