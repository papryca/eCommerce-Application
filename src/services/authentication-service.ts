/* eslint-disable no-console */
import axios, { AxiosResponse } from "axios";

import { ILoginData } from "@interfaces/login-form-data";
// import { ICustomerLoginResponse } from "@interfaces/login-response";
import {
  IRegistrateData,
  ICustomerRegistrationResponse,
} from "@interfaces/registration-form-data";
import { ITokenResponse } from "@interfaces/token-response";
import {
  ILoginResponse,
  IUserFullDataResponse,
} from "@interfaces/user-response";

//  get an access token from the CommerceTools
export const getAccessToken = async () => {
  const authHost = process.env.REACT_APP_AUTH_HOST;
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

  const basicAuth = btoa(`${clientId}:${clientSecret}`);
  const headers = {
    Authorization: `Basic ${basicAuth}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    const response: AxiosResponse<ITokenResponse> = await axios.post(
      `${authHost}/oauth/token?grant_type=client_credentials`,
      null,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//  Obtain an access token from the CommerceTools with Password
export const getAccessTokenPassFlow = async (
  email: string,
  password: string
) => {
  const authHost = process.env.REACT_APP_AUTH_HOST;
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

  const basicAuth = btoa(`${clientId}:${clientSecret}`);
  const headers = {
    Authorization: `Basic ${basicAuth}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const data = new URLSearchParams();
  data.append("grant_type", "password");
  data.append("username", email);
  data.append("password", password);

  console.log("data URL", data);

  const response: AxiosResponse<ITokenResponse> = await axios.post(
    `${authHost}/oauth/ecommerce-app-final-task/customers/token`,
    data.toString(),
    { headers }
  );

  localStorage.setItem("tokenObject", JSON.stringify(response.data));

  return response.data;
};

// Login customer using access token
const loginCustomer = async (
  accessToken: string,
  email: string,
  password: string
): Promise<IUserFullDataResponse> => {
  const apiHost = process.env.REACT_APP_API_HOST;
  const projectKey = process.env.REACT_APP_PROJECT_KEY;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const data = {
    email,
    password,
  };

  const response = await axios.post<ILoginResponse>(
    `${apiHost}/${projectKey}/me/login`,
    data,
    { headers }
  );

  return response?.data?.customer;
};

export const getTokenAndLogin = async (data: ILoginData) => {
  const tokenObject = await getAccessTokenPassFlow(data.email, data.password);
  localStorage.setItem("tokenObject", JSON.stringify(tokenObject));

  return loginCustomer(tokenObject.access_token, data.email, data.password);
};

// Registrate customer using access token
const registrateCustomer = async (
  accessToken: string,
  data: IRegistrateData
): Promise<ICustomerRegistrationResponse> => {
  const apiHost = process.env.REACT_APP_API_HOST;
  const projectKey = process.env.REACT_APP_PROJECT_KEY;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.post<ICustomerRegistrationResponse>(
      `${apiHost}/${projectKey}/me/signup`,
      data,
      { headers }
    );

    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error while logging in:", error);
    throw error;
  }
};

export const getTokenAndRegistrate = async (user: IRegistrateData) => {
  const tokenObject: ITokenResponse = await getAccessToken();
  const customerInfo = await registrateCustomer(tokenObject.access_token, user);
  if (customerInfo) {
    localStorage.setItem("tokenObject", JSON.stringify(tokenObject));
  }

  return customerInfo;
};
