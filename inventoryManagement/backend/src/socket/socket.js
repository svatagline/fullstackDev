import { Server } from "socket.io";

export let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("🔌 Socket-connected:", socket.id);
    socket.on("joinUserRoom", (data) => {
      console.log("======>joinUserRoom:", data);
      if (data.role === "user") {
        socket.join("data");
      }
    });
  });
};
