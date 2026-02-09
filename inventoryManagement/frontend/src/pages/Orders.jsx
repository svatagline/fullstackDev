import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import Table from "../components/common/Table";
import { useApi } from "../api/useApi";
import useSocketEvent from "./useSocketEvent";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useSocketEvent({
    title: "Order Page",
    onInventoryUpdate: (order) => setOrders((prev) => [order, ...prev]),
  });

  // --- Fetch user's orders ---
  const fetchOrders = useApi(() => api.get("/orders"));

  useEffect(() => {
    fetchOrders.request().then((data) => setOrders(data));
  }, []);

  // --- Table mapping ---
  const columns = ["Order ID", "Product", "Quantity", "Date"];
  const data = orders.map((o) => ({
    "Order ID": o._id,
    Product: o.product?.name || o.productId?.name,
    Quantity: o.quantity,
    Date: new Date(o.createdAt).toLocaleString(),
  }));

  return (
    <div>
      <h4 className="mb-3">My Orders</h4>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Orders;
