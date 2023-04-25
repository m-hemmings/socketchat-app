import React, { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import ChatMessages from './ChatMessages';
import ChatForm from './ChatForm';
import '../css/styles.css';

const ENDPOINT = "http://localhost:3123";

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("");
  const [socket, setSocket] = useState(null);
  const inputRef = useRef(null);

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

    socket.on("username", (username) => {
      setUsername(username);
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
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="container">
      <div className="chat-container">
        <ChatMessages messages={messages} />
      </div>
      <ChatForm
        inputRef={inputRef}
        message={newMessage}
        setNewMessage={setNewMessage} 
        handleSubmit={handleSubmit}
        setUsernameCallback={setUsername}
        username={username}
      />
    </div>
  );
}

export default ChatRoom;
