/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import AddToCartButton from "@components/buttons/add-to-cart-btn";
import RemoveFromCartBtn from "@components/buttons/remove-from-cart-btn";
import AppHeader from "@components/header/header";
import getValidAccessToken from "@helpers/check-token";
import { ICartResponse } from "@interfaces/get-cart";
import { ILineItem } from "@interfaces/line-item";
import { IProductResponse } from "@interfaces/product-response";

import ProductEstimation from "@pages/products/product-estimation";

import { addProductToCart, getCart } from "@services/cart-services";
import getProductById from "@services/get-product-by-id";
import RemoveProductFromCart from "@services/remove-product-from-cart";
import { Navigate, useParams } from "react-router-dom";

import ArrowBackIosNewTwoToneIcon from "@mui/icons-material/ArrowBackIosNewTwoTone";
import ArrowForwardIosTwoToneIcon from "@mui/icons-material/ArrowForwardIosTwoTone";

import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "@mui/material";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import useMediaQuery from "@mui/material/useMediaQuery";

import styles from "./modal.module.scss";

const ProductInformation = () => {
  const { id } = useParams();

  // State to store the fetched product data
  const [product, setProduct] = useState<IProductResponse | null>(null);

  // State to toggle description visibility
  const [isDescription, setDescription] = useState(false);

  // State to track when the data is currently being loaded
  const [isLoading, setLoading] = useState(true);

  const [isLoadingButton, setIsLoadingButton] = useState(false);

  // State to track when get error
  const [requestError, setError] = useState<boolean>(false);

  // State to track when the modal is open
  const [isModalOpen, setModalOpen] = useState(false);

  // State to track current slide IN MODAL index
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  // State to track current slide index
  const [currentSlideBasicIndex, setCurrentSlideBasicIndex] = React.useState(0);

  // State to track alert
  const [removeAlertOpen, setRemoveAlertOpen] = React.useState(false);

  // Function to open the modal and set the current slide index
  const openModal = (index: number) => {
    setCurrentSlideIndex(index);
    setModalOpen(true);
  };
  const [isInCart, setIsInCart] = useState(false);

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };
  const [cartItems, setCartItems] = useState<ILineItem[]>([]);

  useEffect(() => {
    // Fetch the cart items and update state
    const fetchCartItems = async () => {
      try {
        const accessToken = await getValidAccessToken();
        const currentCart = await getCart(accessToken.access_token);
        setCartItems(currentCart.lineItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  // Fetch product data when the component mounts
  useEffect(() => {
    const requestData = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    requestData().then();
  }, [id]);

  // Toggle the description when the button is clicked
  const toggleDescription = () => {
    setDescription(!isDescription);
  };

  // Function to switch to the next slide IN MODAL
  const nextSlide = () => {
    if (product) {
      setCurrentSlideIndex(
        (prevIndex) =>
          (prevIndex + 1) %
          product.masterData.current.masterVariant.images.length
      );
    }
  };

  // Function to switch to the previous slide IN MODAL
  const prevSlide = () => {
    setCurrentSlideIndex((index) => {
      if (product) {
        return index === 0
          ? product.masterData.current.masterVariant.images.length - 1
          : index - 1;
      }
      return index;
    });
  };

  // Function to switch to the next slide
  const nextBasicSlide = () => {
    if (product) {
      setCurrentSlideBasicIndex(
        (prevIndex) =>
          (prevIndex + 1) %
          product.masterData.current.masterVariant.images.length
      );
    }
  };

  // Function to switch to the previous slide
  const prevBasicSlide = () => {
    setCurrentSlideBasicIndex((index) => {
      if (product) {
        return index === 0
          ? product.masterData.current.masterVariant.images.length - 1
          : index - 1;
      }
      return index;
    });
  };
  const addToCart = async (productId: string) => {
    try {
      setIsLoadingButton(true);
      const accessToken = await getValidAccessToken();
      const currentCart = await getCart(accessToken.access_token);
      const currentCartId = currentCart.id;
      const currentCartVersion = currentCart.version;

      await addProductToCart(
        currentCartId,
        currentCartVersion,
        productId,
        accessToken.access_token
      );
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setIsLoadingButton(false);
    }
  };

  // remove product from cart
  const removeFromCart = async (
    lineItemId: string,
    currentCart: ICartResponse
  ) => {
    try {
      setIsLoadingButton(true);
      const accessToken = await getValidAccessToken();
      const currentCartId = currentCart.id;
      const currentCartVersion = currentCart.version;

      await RemoveProductFromCart(
        currentCartId,
        currentCartVersion,
        lineItemId,
        accessToken.access_token
      );
    } catch (error) {
      console.error("Error removing product from cart:", error);
    } finally {
      setIsLoadingButton(false);
    }
  };

  // handling adding product to cart
  const handleAddToCart = () => {
    try {
      if (product) {
        addToCart(product.id);
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        cartItems.push({ productId: product?.id });
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        setIsInCart(true);
        setRemoveAlertOpen(false);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  // handling removing product from cart
  const handleRemoveFromCart = async () => {
    try {
      if (product) {
        const accessToken = await getValidAccessToken();
        const currentCart = await getCart(accessToken.access_token);
        const lineItemId = currentCart.lineItems.filter(
          (item: { productId: string }) => item.productId === product.id
        );
        await removeFromCart(lineItemId[0].id, currentCart);
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        const updateCartItems = cartItems.filter(
          (item: { productId: string }) => item.productId !== product.id
        );
        localStorage.setItem("cartItems", JSON.stringify(updateCartItems));
        setIsInCart(false);
        setRemoveAlertOpen(true);
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  useEffect(() => {
    const isProductInCart = cartItems.some(
      (item: ILineItem) => item.productId === product?.id
    );
    setIsInCart(isProductInCart);
  }, [cartItems, product?.id]);

  // Add keyboard navigation within the modal
  useEffect(() => {
    const handleKeyDown = (event: { key: string }) => {
      if (isModalOpen) {
        if (event.key === "ArrowLeft") {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          prevSlide();
        } else if (event.key === "ArrowRight") {
          nextSlide();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <AppHeader />
      {/* eslint-disable-next-line no-nested-ternary */}
      {isLoading ? (
        <Box className={styles.spinner}>
          <CircularProgress />
        </Box>
      ) : // eslint-disable-next-line no-nested-ternary
      requestError ? (
        <Navigate to="*" />
      ) : product ? (
        <div className={styles.article}>
          <Box
            className={styles.product}
            style={isMobile ? { flexDirection: "column" } : {}}
          >
            <div>
              <div>
                <Typography variant="h4" gutterBottom>
                  {product.masterData.current.name["en-US"]}
                </Typography>
              </div>
              <div className={styles.title}>
                <Typography variant="body1">
                  {isDescription
                    ? product.masterData.current.description["en-US"]
                    : `${product.masterData.current.description["en-US"].slice(
                        0,
                        600
                      )}...`}
                </Typography>
                <Button onClick={toggleDescription}>
                  {isDescription ? "Read Less" : "Show More"}
                </Button>
              </div>
              <ProductEstimation product={product} />
              <AddToCartButton
                isInCart={isInCart}
                handleAddToCart={handleAddToCart}
                isLoadingButton={isLoadingButton}
              />
              <Box sx={{ width: "100%" }}>
                <RemoveFromCartBtn
                  isInCart={isInCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                  isLoadingButton={isLoadingButton}
                  aria-describedby={id}
                />
                <Collapse in={removeAlertOpen}>
                  <Alert
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setRemoveAlertOpen(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    Product removed from cart.
                  </Alert>
                </Collapse>
              </Box>
            </div>
            <div style={{ maxWidth: 400 }}>
              <div className={styles.arrows}>
                <ArrowBackIosNewTwoToneIcon
                  className={styles.arrowLeft}
                  onClick={prevBasicSlide}
                />
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                <img
                  className={styles.image}
                  // style={{ maxWidth: "300px" }}
                  onClick={() => openModal(currentSlideBasicIndex)}
                  src={
                    product.masterData.current.masterVariant.images[
                      currentSlideBasicIndex
                    ].url
                  }
                  alt="product image"
                />
                <ArrowForwardIosTwoToneIcon
                  className={styles.arrowRight}
                  onClick={nextBasicSlide}
                />
              </div>
            </div>
          </Box>
          <Modal
            open={isModalOpen}
            onClose={closeModal}
            className={styles.modal}
          >
            <div className={styles.moooo}>
              <div className={styles.cross}>
                <CancelOutlinedIcon
                  fontSize="large"
                  className={styles.close}
                  onClick={closeModal}
                />
              </div>

              <div className={styles.arrows}>
                <ArrowBackIosNewTwoToneIcon
                  className={styles.arrowLeft}
                  onClick={prevSlide}
                />
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                <img
                  className={styles.image}
                  src={
                    product.masterData.current.masterVariant.images[
                      currentSlideIndex
                    ].url
                  }
                  alt="product image"
                />
                <ArrowForwardIosTwoToneIcon
                  className={styles.arrowRight}
                  onClick={nextSlide}
                />
              </div>
            </div>
          </Modal>
        </div>
      ) : (
        <div>No product data available</div>
      )}
    </div>
  );
};

export default ProductInformation;
