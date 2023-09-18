import axios from "axios";

import getValidAccessToken from "@helpers/check-token";
import { ICartResponse } from "@interfaces/get-cart";
import { ITokenResponse } from "@interfaces/token-response";
import createCart from "@services/create-cart";

const getCart = async (): Promise<ICartResponse> => {
  const tokenObject: ITokenResponse = await getValidAccessToken();

  const apiHost = process.env.REACT_APP_API_HOST;
  const projectKey = process.env.REACT_APP_PROJECT_KEY;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${tokenObject.access_token}`,
  };

  try {
    const response = await axios.get<ICartResponse>(
      `${apiHost}/${projectKey}/me/active-cart`,
      { headers }
    );
    return response.data;
  } catch (error) {
    return await createCart();
  }
};
export default getCart;
