import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId
    });

    socket.on("messageReceived", ({ firstName, text }) => {
      setMessages((messages) => [...messages, { firstName, text }]);
      console.log(firstName + " : " + text);
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!socketRef.current) return;

    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      text: newMessage,
      userId,
      targetUserId
    });

    setNewMessage(""); // Clear the input field
  };

  return (
    <div className="w-1/2 mx-auto border  flex flex-col h-[72vh] justify-between">
      <h1 className="p-5 border-b border-zinc-400 text-3xl">
        Chat with {targetUserId}
      </h1>
      <div className="flex-1 overflow-scroll p-5 w-full ">
        {/* display message */}
        {messages.map((msg, index) => {
          return (
            <div key={index} className="chat chat-start ">
              <div className="chat-header">
                {msg.firstName}
                <time className="text-xs opacity-50"> 2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border border-zinc-600 flex items-center gap-3">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 rounded p-2 text-white bg-gray-700"
        ></input>
        <button onClick={() => sendMessage()} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
