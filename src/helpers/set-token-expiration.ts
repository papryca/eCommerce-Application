import { ITokenResponse } from "@interfaces/token-response";

const setTokenObject = (tokenObject: ITokenResponse, name: string) => {
  const buffer5min = 5 * 60;
  const expires = tokenObject.expires_in;

  // shows when token expires
  const expiration = Date.now() / 1000 + expires - buffer5min;

  // sets expiration date (instead of left time) to tokenObject
  // eslint-disable-next-line no-param-reassign
  tokenObject.expires_in = expiration;

  // localStorage.setItem("unauthorizedTokenObject", JSON.stringify(tokenObject));
  localStorage.setItem(name, JSON.stringify(tokenObject));
};

export default setTokenObject;
