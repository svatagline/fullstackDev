import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { SocketContext } from "../context/SocketContext";
import Table from "../components/common/Table";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    api.get("/orders").then((res) => setOrders(res.data));
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("admin:new-order", (data) => {
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
