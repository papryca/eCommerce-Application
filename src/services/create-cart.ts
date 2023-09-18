import axios from "axios";

import getValidAccessToken from "@helpers/check-token";
import { ICartResponse } from "@interfaces/get-cart";
import { ITokenResponse } from "@interfaces/token-response";

const createCart = async (): Promise<ICartResponse> => {
  const tokenObject: ITokenResponse = await getValidAccessToken();

  const apiHost = process.env.REACT_APP_API_HOST;
  const projectKey = process.env.REACT_APP_PROJECT_KEY;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${tokenObject.access_token}`,
  };
  const requestData = {
    currency: "USD",
  };

  try {
    const response = await axios.post<ICartResponse>(
      `${apiHost}/${projectKey}/me/carts`,
      requestData,
      { headers }
    );
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error while creating cart:", error);
    throw error;
  }
};
export default createCart;
