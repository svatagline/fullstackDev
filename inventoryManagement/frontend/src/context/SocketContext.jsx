// SocketContext.jsx
import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    const s = io("http://localhost:5000", {
      auth: { token: user.token },
    });

    // Join user-specific room
    console.log("object1");
    s.emit("joinUserRoom", user);
    console.log("object2");
    // Admin join handled separately if user.role==='admin'
    if (user.role === "admin") s.emit("joinAdminRoom");

    setSocket(s);

    return () => s.disconnect();
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
