import { IBaseAddress } from "./registration-form-data";

interface IAction {
  action: string;
  [Key: string]: string;
}

interface IAddressAction {
  action: string;
  addressId?: string;
  address: IBaseAddress;
}

export interface IUserUpdate {
  version: number;
  actions: IAction[];
}

export interface IAddressUpdate {
  version: number;
  actions: IAddressAction[];
}

export interface IPasswordUpdate {
  version: number;
  currentPassword: string;
  newPassword: string;
}
