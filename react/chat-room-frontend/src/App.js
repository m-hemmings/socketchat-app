import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = "http://localhost:3123";

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    socket.on("previous-messages", (messages) => {
      setMessages(messages);
    });
  }, [socket, messages]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const messageObject = {
      user: {
        username: username,
      },
      message: {
        text: newMessage,
        timestamp: new Date().getTime(),
      }
  };

    socket.emit("message", messageObject);

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
