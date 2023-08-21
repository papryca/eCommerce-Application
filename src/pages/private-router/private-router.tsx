import { Outlet, Navigate } from "react-router-dom";

const checkToken = () => {
  const token = localStorage.getItem("tokenObject");
  return token !== null;
};

const PrivateRoute = () => {
  return checkToken() ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;
