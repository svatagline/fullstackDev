import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Navigate } from "react-router-dom";

export const ProtectedLayout = ({ children }) => {
  const token = localStorage.getItem("token");

  return (
    <>
      {token ? (
        <div className="d-flex">
          <Sidebar />

          <div className="flex-grow-1">
            <Navbar />
            <div className="container mt-4">{children}</div>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export const PublicLayout = ({ children }) => {
  const token = localStorage.getItem("token");

  return <>{!token ? children : <Navigate to="/products" />}</>;
};
