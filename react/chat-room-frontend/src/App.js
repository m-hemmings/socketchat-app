import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = "http://localhost:3001"; // Replace with your Socket.IO server URL

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const messageObject = {
      username: username,
      text: newMessage,
      timestamp: new Date().getTime(),
    };
    socketIOClient(ENDPOINT).emit("send_message", messageObject);
    setMessages([...messages, messageObject]);
    setNewMessage("");
  };

  return (
    <div>
      <h1>Chat Room</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <span>{message.username}: </span>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          placeholder="Enter message"
        />
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter username"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
