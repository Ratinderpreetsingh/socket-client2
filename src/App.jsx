import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { io } from "socket.io-client";
import Login from "./Login";
import ChatPage from "./ChatPages";
import { BrowserRouter ,Routes,Route} from "react-router-dom";

function App() {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  const [message, sendMessage] = useState("");
  const [receivemessage, sendreceivemessage] = useState([]);
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
    if (roomid) {
      // Send message to a specific room
      socket.emit("message", { message, roomid });
    } else {
      // Send message to all users
      socket.emit("allmessage", message);
    }
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
      sendreceivemessage((mes) => [...mes, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
<BrowserRouter >
      <Routes>
 
        <Route path="/" element={<Login/>} /> {/* 👈 Renders at /app/ */}
        <Route path="/chat-page" element={<ChatPage/>} /> {/* 👈 Renders at /app/ */}

      </Routes>
    </BrowserRouter>
    {/* <ChatPage/> */}
      {/* <div>
        <h1>Messages </h1>
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

        <form
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          onSubmit={handleSubmit}
        >
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

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{}}>
            <h3>me:ratinder</h3>
          </div>

          <div>
            {receivemessage &&
              receivemessage.map((data) => {
                return <h3>{data}</h3>;
              })}
          </div>
        </div>
      </div> */}
    </>
  );
}

export default App;
