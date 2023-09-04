import { IBaseAddress } from "./registration-form-data";

export interface IUserPersonalDataResponse {
  version?: number;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
}

export interface IUserPersonalDataUpdate {
  version: number;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface IUserFullDataResponse {
  version: number;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  addresses: IBaseAddress[];
  billingAddressIds: string[];
  shippingAddressIds: string[];
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
}

export interface ILoginResponse {
  customer: IUserFullDataResponse;
}

export interface IUserAddressResponse {
  version?: number;
  addresses: IBaseAddress[];
  billingAddressIds: string[];
  shippingAddressIds: string[];
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
}
