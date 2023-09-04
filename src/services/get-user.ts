/* eslint-disable no-console */
import axios from "axios";

const getUser = async () => {
  const tokenObject = JSON.parse(localStorage.getItem("tokenObject") || "null");
  const accessToken = tokenObject?.access_token || "";
  const apiHost = process.env.REACT_APP_API_HOST;
  const projectKey = process.env.REACT_APP_PROJECT_KEY;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.get(`${apiHost}/${projectKey}/me`, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user data (in get user service):", error);
    throw error;
  }
};

export default getUser;
