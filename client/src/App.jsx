import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");

function App() {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState([]);

  const sendMessage = () => {
    console.log("button clicked");
    socket.emit("send_message", { message: message });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // alert(data.message)
      setReceivedMessage((prev) => [...prev, data.message]);
    });
  }, [socket]);

  return (
    <>
      <div className="App">
        <input
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send message</button>
      </div>

      <div>
        {receivedMessage.map((item) => (
          <div>{item}</div>
        ))}
      </div>
    </>
  );
}

export default App;
