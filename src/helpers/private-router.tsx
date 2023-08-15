import { Outlet, Navigate } from "react-router-dom";

const checkToken = () => {
  /**
   * TODO logic
   * const accessToken = localStorage.getItem('access_token');
   *   return !!accessToken;
   */
  return true;
};

const PrivateRoute = () => {
  return checkToken() ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;
