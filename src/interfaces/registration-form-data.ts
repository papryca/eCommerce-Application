export interface IRegisterFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  shippingStreet: string;
  shippingCity: string;
  shippingCountry: string;
  shippingPostcode: string;
  billingStreet: string;
  billingCity: string;
  billingCountry: string;
  billingPostcode: string;
}

export interface IBaseAddress {
  id?: string;
  country: string;
  streetName: string;
  postalCode: string;
  city: string;
}

export interface IRegistrateData {
  addresses: IBaseAddress[];
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  password: string;
  shippingAddresses: number[];
  defaultShippingAddress?: number;
  billingAddresses: number[];
  defaultBillingAddress?: number;
}

export interface ICustomerRegistrationResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}
