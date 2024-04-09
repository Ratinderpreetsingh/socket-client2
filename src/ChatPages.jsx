import React, { useContext, useEffect, useMemo, useState } from "react";
import logo from "../src/assets/chat.svg"; // Import your logo image
import ReactScrollToBottom from "react-scroll-to-bottom"; // Correct import
import { io } from "socket.io-client";
import { UserContext } from "./Store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChatPage = () => {
  const { username, setUsername } = useContext(UserContext);
  console.log(username);
  const socket = useMemo(() => io("http://localhost:3000"), []);

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [noti, setNoti] = useState(false);

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      socket.emit("allmessage", { text: inputText, sender: "me" });
      setInputText("");
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.emit("joined", username);

    socket.on("userJoined", (neww) => {
      console.log("userJoined", neww);
      setNoti(true); // Set noti to true when a user joins
    });

    socket.on("welcome",(data)=>{
      console.log("welcome-message", data);
    });

    socket.on("recieve-message", (data) => {
      console.log("recieve-message", data);
      setMessages(prevMessages => [...prevMessages, data]);
    });
    console.log("messages--------",messages)

  }, [messages]);

  useEffect(() => {
    if (noti) {
      toast("A new user has joined!"); // Show toast notification when noti is true
    }
  }, [noti]);

  return (
    <>
      <ToastContainer />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f5f5f5",
          minHeight: "500px",
        }}
      >
        {/* Header with logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            borderBottom: "1px solid #ccc",
            backgroundColor: "#007bff",
            color: "#fff",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          <h1 style={{ margin: 0 }}>Gal Baat</h1>
        </div>

        {/* Chat messages */}
        <div style={{ flex: 1, padding: "10px" }}>
          <ReactScrollToBottom>
            {messages.map((message, index) => (
              <div key={index} style={{ textAlign: message.sender === 'me' ? 'right' : 'left' }}>
                <span style={{ backgroundColor: message.sender === 'me' ? '#007bff' : '#f3f3f3', color: message.sender === 'me' ? '#fff' : '#000', padding: '8px', borderRadius: '8px', display: 'inline-block', maxWidth: '70%' }}>
                  {message.text}
                </span>
              </div>
            ))}
          </ReactScrollToBottom>
        </div>

        {/* Input message box */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            borderTop: "1px solid #ccc",
            backgroundColor: "#fff",
          }}
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            style={{
              flex: 1,
              marginRight: "10px",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={handleSendMessage}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#007bff",
              color: "#fff",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
