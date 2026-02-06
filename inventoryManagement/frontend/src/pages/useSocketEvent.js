import React, { useEffect } from "react";
import { SocketContext } from "../context/SocketContext";

const useSocketEvent = ({ title, onInventoryUpdate, onNewOrder }) => {
  const socket = React.useContext(SocketContext);
  useEffect(() => {
    if (!socket) return;

    // Live stock update
    socket.on("inventory:update", (data) => {
      console.log("stocktest", title, data);
      onInventoryUpdate && onInventoryUpdate(data);
    });

    // Admin notification example
    socket.on("admin:new-order", (data) => {
      console.log("New order placed:", data);
      onNewOrder && onNewOrder(data);
    });

    return () => {
      socket.off("inventory:update");
      socket.off("admin:new-order");
    };
  }, [socket]);
};

export default useSocketEvent;
