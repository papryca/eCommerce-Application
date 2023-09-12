import { ITokenResponse } from "@interfaces/token-response";
import {
  getAccessToken,
  refreshAccessToken,
} from "@services/authentication-service";

import setTokenObject from "./set-token-expiration";

const getValidAccessToken = async () => {
  let tokenObject: ITokenResponse = JSON.parse(
    localStorage.getItem("tokenObject") ||
      localStorage.getItem("unauthorizedTokenObject") ||
      "null"
  );

  const now = Date.now() / 1000;

  if (!tokenObject || !tokenObject.access_token) {
    try {
      tokenObject = await getAccessToken();
      setTokenObject(tokenObject, "unauthorizedTokenObject");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  if (now > tokenObject.expires_in) {
    tokenObject = await refreshAccessToken(tokenObject.refresh_token);
    if (localStorage.getItem("tokenObject")) {
      setTokenObject(tokenObject, "tokenObject");
    }
    if (localStorage.getItem("unauthorizedTokenObject")) {
      setTokenObject(tokenObject, "unauthorizedTokenObject");
    }
  }

  return tokenObject;
};

export default getValidAccessToken;
