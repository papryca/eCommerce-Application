import axios from "axios";

import { IProductResponse } from "@interfaces/product-response";

const RemoveProductFromCart = async (
  currentCartId: string,
  currentCartVersion: number,
  productId: string,
  accessToken: string
): Promise<IProductResponse> => {
  const apiHost = process.env.REACT_APP_API_HOST;
  const projectKey = process.env.REACT_APP_PROJECT_KEY;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  const requestBody = {
    version: currentCartVersion,
    actions: [
      {
        action: "removeLineItem",
        lineItemId: productId,
      },
    ],
  };
  try {
    const response = await axios.post(
      `${apiHost}/${projectKey}/me/carts/${currentCartId}`,
      requestBody,
      { headers }
    );
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error while removing cart:", error);
    throw error;
  }
};
export default RemoveProductFromCart;
