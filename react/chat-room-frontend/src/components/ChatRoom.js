import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import ChatMessages from './ChatMessages';
import ChatForm from './ChatForm';
import '../css/styles.css'; // import the styles.css file

const ENDPOINT = "http://localhost:3123";

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("");
  const [socket, setSocket] = useState(null);
  const [name, setName] = useState("");

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
    <div className="container"> // use the "container" class from styles.css
      <div className="chat-container"> // use the "chat-container" class from styles.css
        <ChatMessages messages={messages} />
      </div>
      <ChatForm
        name={name}
        message={message}
        setName={setName}
        setMessage={setMessage}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default ChatRoom;
