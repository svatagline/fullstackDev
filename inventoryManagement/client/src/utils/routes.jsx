import { createBrowserRouter } from "react-router-dom";
import Login from "../components/pageComponents/login/Login";
import AddOrder from "../components/pageComponents/addOrder/AddOrder";
import ProductList from "../components/pageComponents/productList/ProductList";
import Dashboard from "../components/pageComponents/dashboard/Dashboard";
import PrivetProtectedRoute from "../components/common/PrivetProtectedRoute";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  ...[
    {
      path: "/add-order",
      element: <AddOrder />,
    },
    {
      path: "/product-list",
      element: <ProductList />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ].map((route) => ({
    ...route,
    element: <PrivetProtectedRoute>{route.element}</PrivetProtectedRoute>,
  })),
]);
