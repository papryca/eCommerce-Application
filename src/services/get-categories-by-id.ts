/* eslint-disable no-console */
import axios from "axios";

import { ITokenResponse } from "@interfaces/token-response";

const getCategories = async () => {
  try {
    const tokenObject: ITokenResponse = JSON.parse(
      localStorage.getItem("tokenObject") ||
        localStorage.getItem("unauthorizedTokenObject") ||
        "null"
    );

    const accessToken = tokenObject.access_token;
    const apiHost = process.env.REACT_APP_API_HOST;
    const projectKey = process.env.REACT_APP_PROJECT_KEY;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.get(`${apiHost}/${projectKey}/categories`, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export default getCategories;
