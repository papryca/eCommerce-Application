import { Navigate } from "react-router-dom";

const isUserLogged = () => {
  return localStorage.getItem("tokenObject") !== null;
};

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isUserLogged() ? children : <Navigate to="/login" />;
};
export default PrivateRoute;
