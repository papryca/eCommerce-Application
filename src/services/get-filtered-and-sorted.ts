/* eslint-disable no-console */
import axios, { AxiosError } from "axios";

import { IQueryParams } from "@interfaces/query-params";

import { ITokenResponse } from "@interfaces/token-response";

const getFilteredAndSortedProducts = async (
  filterCriteria: Record<string, string>,
  sortingOption: string,
  searchQuery: string
) => {
  try {
    const tokenObject: ITokenResponse = JSON.parse(
      localStorage.getItem("tokenObject") ||
        localStorage.getItem("unauthorizedTokenObject") ||
        "null"
    );

    const accessToken = tokenObject?.access_token;
    const apiHost = process.env.REACT_APP_API_HOST;
    const projectKey = process.env.REACT_APP_PROJECT_KEY;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    const filterQueryString = Object.entries(filterCriteria)
      .map(
        ([key, value]) =>
          `filter=${encodeURIComponent(key)}:${encodeURIComponent(value)}`
      )
      .join("&");

    const queryParams: IQueryParams = {};

    if (sortingOption) {
      queryParams.sort = sortingOption;
    }
    if (searchQuery) {
      // queryParams.search = searchQuery;
      queryParams["text.en-Us"] = searchQuery;
      queryParams.fuzzy = "true";
      queryParams.fuzzyLevel = "1";
    }

    const response = await axios.get(
      `${apiHost}/${projectKey}/product-projections/search?${filterQueryString}`,
      {
        headers,
        params: queryParams,
      }
    );

    return response.data.results;
  } catch (error) {
    if (
      (error as AxiosError).response &&
      (error as AxiosError).response?.status === 400
    ) {
      console.error("Too short request:", error);
      throw new Error("Too short request");
    } else {
      console.error("Error searching products:", error);
      throw error;
    }
  }
};

export default getFilteredAndSortedProducts;
