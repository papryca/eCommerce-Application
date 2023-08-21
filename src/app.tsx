import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Page404 from "./pages/404/404";
import Cart from "./pages/cart/cart";
import Catalog from "./pages/catalog/catalog";
import Login from "./pages/login/login";
import Logout from "./pages/logout/logout";
import Home from "./pages/main/main";
import Registration from "./pages/registration/registration";

import "./app.scss";
import "./index.scss";

const App = () => {
  return (
    <Router>
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
              <Route path="*" element={<Page404 />} />
            </Routes>
          </main>
        </div>
      </LocalizationProvider>
    </Router>
  );
};

export default App;
