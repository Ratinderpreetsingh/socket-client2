import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { io } from "socket.io-client";

function App() {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [message, sendMessage] = useState("");
  const [receivemessage, sendreceivemessage] = useState("");
  const [socketid, setSocketId] = useState("");
  const [roomid, setRoomID] = useState("");
  const [roomName, setRoomName] = useState("");

  const joinRoomhandler = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // socket.emit("message",message)
    socket.emit("message", { message, roomid });

    sendMessage("");
  };
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
      setSocketId(socket.id);
    });

    socket.on("welcome", (s) => {
      console.log("welcone", s);
    });
    socket.on("recieve-message", (data) => {
      console.log("message send", data);
      sendreceivemessage(data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <div>
        <h1>Message </h1>
        <h5>{socketid}</h5>

        <form onSubmit={joinRoomhandler}>
          <input
            type="text"
            placeholder="Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />

          <button type="submit">Join Room</button>
        </form>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="write message"
            value={message}
            onChange={(e) => sendMessage(e.target.value)}
          />

          <input
            type="text"
            placeholder="room id"
            value={roomid}
            onChange={(e) => setRoomID(e.target.value)}
          />
          <button type="submit">Send Message</button>
        </form>
        <h3>{receivemessage}</h3>
      </div>
    </>
  );
}

export default App;
