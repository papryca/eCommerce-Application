import axios, { AxiosResponse } from "axios";

import { ICustomerLoginResponse } from "@interfaces/login-response";
import { ITokenResponse } from "@interfaces/token-response";

//  Obtain an access token from the CommerceTools
export const obtainAccessTokenPassFlow = async (
  email: string,
  password: string
) => {
  // Note: clientId, clientSecret taken from "API The Reactonauts" not from "E-commerce App API"
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

  const response: AxiosResponse<ITokenResponse> = await axios.post(
    `${authHost}/oauth/ecommerce-app-final-task/customers/token`,
    data.toString(),
    { headers }
  );

  localStorage.setItem("tokenObject", JSON.stringify(response.data));

  return response.data;
};

// Login customer using access token
export const loginCustomer = async (
  accessToken: string,
  email: string,
  password: string
): Promise<ICustomerLoginResponse> => {
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

  const response = await axios.post<ICustomerLoginResponse>(
    `${apiHost}/${projectKey}/me/login`,
    data,
    { headers }
  );

  return response.data;
};
