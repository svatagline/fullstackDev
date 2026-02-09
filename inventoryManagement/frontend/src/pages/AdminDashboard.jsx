import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { SocketContext } from "../context/SocketContext";
import Table from "../components/common/Table";
import useSocketEvent from "./useSocketEvent";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const socket = useContext(SocketContext);

  useSocketEvent({
    title: "Dashboard Page",
    onInventoryUpdate: (order) =>
      setOrders((prev) => console.log({ order, orders })),
  });

  useEffect(() => {
    api.get("/orders").then((res) => setOrders(res.data));
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("admin:new-order", (data) => {
      console.log({ data, orders });
      setOrders((prev) => [data, ...prev]);
    });

    return () => socket.off("admin:new-order");
  }, [socket]);

  return (
    <>
      <h4 className="mb-3">Admin Dashboard</h4>

      <Table
        columns={["Order ID", "Product", "Quantity"]}
        data={orders.map((o) => ({
          "Order ID": o.orderId || o._id,
          Product: o.product || o.productId?.name,
          Quantity: o.quantity,
        }))}
      />
    </>
  );
};

export default AdminDashboard;
