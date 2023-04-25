import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import ChatMessages from './ChatMessages';
import ChatForm from './ChatForm';

const ENDPOINT = "http://localhost:3123";

function ChatRoom() {
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
      username: username,
      content: {
        text: newMessage,
        timestamp: new Date().getTime(),
      },
    };

    socket.emit("message", messageObject);

    setNewMessage("");
  };

  return (
    <div>
      <h1>Chat Room</h1>
      <ChatMessages messages={messages} />
      <ChatForm
        handleSubmit={handleSubmit}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        username={username}
        setUsername={setUsername}
      />
    </div>
  );
}

export default ChatRoom;
