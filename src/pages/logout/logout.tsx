import React from "react";

import { Navigate } from "react-router-dom";

const Logout: React.FC = () => {
  localStorage.removeItem("tokenObject");
  localStorage.removeItem("cartItems");
  return <Navigate to="/login" />;
};
export default Logout;
