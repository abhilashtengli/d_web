import { io } from "socket.io-client";
import { Base_Url } from "./Constants";

export const createSocketConnection = () => {
  return io(Base_Url, {
    transports: ["websocket"], // Use WebSocket as the preferred transport
    withCredentials: true
  }); // This will not work in production needs to make some changes
};
