import { io } from "socket.io-client";
import { Base_Url } from "./Constants";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(Base_Url, {
      transports: ["websocket"], // Use WebSocket as the preferred transport
      withCredentials: true
    });
  } else {
    return io("/", {
      path: "/api/socket.io", //for production
      transports: ["websocket"], // Use WebSocket as the preferred transport
      withCredentials: true
    });
  }
};
