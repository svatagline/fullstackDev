import React, { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";

const useSocketEvent = ({ onInventoryUpdate, onNewOrder }) => {
  const socket = useContext(SocketContext);
  useEffect(() => {
    if (!socket) return;

    // Live stock update
    socket.on("inventory:update", (data) => {
      onInventoryUpdate && onInventoryUpdate(data);
    });

    // Admin notification example
    socket.on("admin:new-order", (data) => {
      onNewOrder && onNewOrder(data);
    });

    socket.on("admin:enter", (data) => {
      console.log("data123", data);
    });

    return () => {
      socket.off("inventory:update");
      socket.off("admin:new-order");
      socket.off("admin:enter");
    };
  }, [socket]);
};

export default useSocketEvent;
