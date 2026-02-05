import { Navigate } from "react-router-dom";
import PrivetLayout from "./PrivetLayout";

const PrivetProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? <PrivetLayout>{children}</PrivetLayout> : <Navigate to="/" />;
};

export default PrivetProtectedRoute;
