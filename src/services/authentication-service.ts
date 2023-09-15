/* eslint-disable no-console */
import axios, { AxiosResponse } from "axios";

import getValidAccessToken from "@helpers/check-token";
import setTokenObject from "@helpers/set-token-expiration";
import { ILoginData } from "@interfaces/login-form-data";
import {
  IRegistrateData,
  ICustomerRegistrationResponse,
} from "@interfaces/registration-form-data";
import { ITokenResponse } from "@interfaces/token-response";
import {
  ILoginResponse,
  IUserFullDataResponse,
} from "@interfaces/user-response";

// token requests data
const authHost = process.env.REACT_APP_AUTH_HOST;
const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const basicAuth = btoa(`${clientId}:${clientSecret}`);

//  get an access token from the CommerceTools
export const getAccessToken = async () => {
  const headers = {
    Authorization: `Basic ${basicAuth}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    const response: AxiosResponse<ITokenResponse> = await axios.post(
      `${authHost}/oauth/ecommerce-app-final-task/anonymous/token?grant_type=client_credentials`,
      null,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Refresh access token
export const refreshAccessToken = async (expiredToken: string) => {
  const headers = {
    Authorization: `Basic ${basicAuth}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    const response: AxiosResponse<ITokenResponse> = await axios.post(
      `${authHost}/oauth/token?grant_type=refresh_token&refresh_token=${expiredToken}`,
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

  setTokenObject(response.data, "tokenObject");

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

  const anonymCartID = localStorage.getItem("anonymCardID");

  const data = {
    email,
    password,
    activeCartSignInMode: "MergeWithExistingCustomerCart",
    anonymousCart: {
      id: anonymCartID,
      typeId: "cart",
    },
  };

  let response;
  try {
    response = await axios.post<ILoginResponse>(
      `${apiHost}/${projectKey}/me/login`,
      data,
      { headers }
    );
  } catch (err) {
    console.log(err);
  }

  localStorage.removeItem("unauthorizedTokenObject");

  return response?.data?.customer as IUserFullDataResponse;
};

// login with anonymous token
export const getTokenAndLogin = async (data: ILoginData) => {
  const token = await getValidAccessToken();
  getAccessTokenPassFlow(data.email, data.password);
  return loginCustomer(token.access_token, data.email, data.password);
  // const tokenObject = await getAccessTokenPassFlow(data.email, data.password);
  // return loginCustomer(tokenObject.access_token, data.email, data.password);
};

// login with passflow token
export const getTokenAndLoginAfterRegistrate = async (data: ILoginData) => {
  const tokenObject = await getAccessTokenPassFlow(data.email, data.password);

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
    await axios.post(
      `${apiHost}/${projectKey}/me/carts`,
      {
        currency: "USD",
      },
      { headers }
    );

    const userDataWithCart = {
      ...data,
      activeCartSignInMode: "MergeWithExistingCustomerCart",
    };
    const response = await axios.post<ICustomerRegistrationResponse>(
      `${apiHost}/${projectKey}/me/signup`,
      userDataWithCart,
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
  const tokenObject = await getValidAccessToken();

  return registrateCustomer(tokenObject.access_token, user);
};
