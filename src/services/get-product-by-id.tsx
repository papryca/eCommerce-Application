import axios from "axios";

import { IProductResponse } from "@interfaces/product-response";
import { ITokenResponse } from "@interfaces/token-response";
import { getAccessToken } from "@services/authentication-service";

const getProductById = async (
  id: string | undefined
): Promise<IProductResponse> => {
  const tokenObject: ITokenResponse = await getAccessToken();

  const apiHost = process.env.REACT_APP_API_HOST;
  const projectKey = process.env.REACT_APP_PROJECT_KEY;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${tokenObject.access_token}`,
  };

  try {
    const response = await axios.get<IProductResponse>(
      `${apiHost}/${projectKey}/products/${id}`,
      { headers }
    );

    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error while receiving product:", error);
    throw error;
  }
};
export default getProductById;
