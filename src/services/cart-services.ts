/* eslint-disable no-console */
import axios from "axios";

import getValidAccessToken from "@helpers/check-token";

const apiHost = process.env.REACT_APP_API_HOST;
const projectKey = process.env.REACT_APP_PROJECT_KEY;

// create new cart
const createCart = async (accessToken: string) => {
  try {
    const newCartResponse = await axios.post(
      `${apiHost}/${projectKey}/me/carts`,
      {
        currency: "USD",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("New cart created", newCartResponse.data);
    return newCartResponse.data;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
};

// get existing cart (if not exist, creates new one)
const getCart = async (accessToken: string) => {
  try {
    const activeCartResponse = await axios.get(
      `${apiHost}/${projectKey}/me/active-cart`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("Active cart exists", activeCartResponse.data);
    return activeCartResponse.data;
  } catch (error) {
    const newCart = await createCart(accessToken);
    localStorage.setItem("anonymCardID", newCart.id);
    return newCart;
  }
};

// add product to cart
const addProductToCart = async (
  currentCartId: string,
  currentCartVersion: number,
  productId: string,
  accessToken: string
) => {
  try {
    const addToCartResponse = await axios.post(
      `${apiHost}/${projectKey}/me/carts/${currentCartId}`,
      {
        version: currentCartVersion,
        actions: [
          {
            action: "addLineItem",
            productId,
            quantity: 1,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(
      `Product ${productId} added to active cart:`,
      addToCartResponse.data
    );
    return addToCartResponse.data;
  } catch (error) {
    console.error("Error adding product to active cart:", error);
    throw error;
  }
};

// change product quantity in cart or delete product
const changeLineItemQuantity = async (
  currentCartId: string,
  currentCartVersion: number,
  lineItemId: string,
  quantity: number
) => {
  const tokenObject = await getValidAccessToken();
  const accessToken = tokenObject.access_token;

  try {
    const changeQuantityResponse = await axios.post(
      `${apiHost}/${projectKey}/me/carts/${currentCartId}`,
      {
        version: currentCartVersion,
        actions: [
          {
            action: "changeLineItemQuantity",
            lineItemId,
            quantity,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(
      "LineItem quantity changed, cart:",
      changeQuantityResponse.data
    );
    return changeQuantityResponse.data;
  } catch (error) {
    console.error("Error adding product to active cart:", error);
    throw error;
  }
};

// clear cart
const deleteCart = async (
  currentCartId: string,
  currentCartVersion: number
) => {
  const tokenObject = await getValidAccessToken();
  const accessToken = tokenObject.access_token;

  try {
    const deleteCartResponse = await axios.delete(
      `${apiHost}/${projectKey}/me/carts/${currentCartId}/?version=${currentCartVersion}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return deleteCartResponse.data;
  } catch (error) {
    console.error("Error adding product to active cart:", error);
    throw error;
  }
};

export {
  getCart,
  createCart,
  addProductToCart,
  changeLineItemQuantity,
  deleteCart,
};
