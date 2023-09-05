import React from "react";

import { Navigate } from "react-router-dom";

const Logout: React.FC = () => {
  localStorage.removeItem("tokenObject");
  return <Navigate to="/login" />;
};
export default Logout;
