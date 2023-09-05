/* eslint-disable no-console */
import theme from "@constants/theme";
import { ITokenResponse } from "@interfaces/token-response";
import { getAccessToken } from "@services/authentication-service";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Page404 from "./pages/404/404";
import Cart from "./pages/cart/cart";
import Catalog from "./pages/catalog/catalog";
import Login from "./pages/login/login";
import Logout from "./pages/logout/logout";
import Home from "./pages/main/main";

import Product from "./pages/products/products";
import Profile from "./pages/profile/profile";

import Registration from "./pages/registration/registration";

import "./app.scss";
import "./index.scss";

const App = () => {
  const checkToken = async () => {
    let tokenObject: ITokenResponse = JSON.parse(
      localStorage.getItem("tokenObject") ||
        localStorage.getItem("unauthorizedTokenObject") ||
        "null"
    );
    if (!tokenObject || !tokenObject.access_token) {
      try {
        tokenObject = await getAccessToken();

        localStorage.setItem(
          "unauthorizedTokenObject",
          JSON.stringify(tokenObject)
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  checkToken();

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="app">
            <main className="main">
              <Routes>
                <Route path="/registration" element={<Registration />} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/catalog/:id" element={<Product />} />
                <Route path="*" element={<Page404 />} />
              </Routes>
            </main>
          </div>
        </LocalizationProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
