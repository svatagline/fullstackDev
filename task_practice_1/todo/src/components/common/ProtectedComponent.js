import { Navigate, Outlet } from "react-router-dom";

export const Protected = () => {
    const token = localStorage.getItem("token");

    return token ? <Outlet /> : <Navigate to="/login" />;
};

export const Public = () => {
    const token = localStorage.getItem("token");

    return token ? <Navigate to="/" /> : <Outlet />;
};
