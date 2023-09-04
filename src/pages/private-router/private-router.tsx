import { Navigate } from "react-router-dom";

export const checkToken = () => {
  const token = localStorage.getItem("tokenObject");
  return token !== null;
};

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return checkToken() ? children : <Navigate to="/login" />;
};
export default PrivateRoute;
