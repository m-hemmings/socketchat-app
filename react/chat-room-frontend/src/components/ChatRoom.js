import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

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

    console.log(messageObject); // log the message object

    socket.emit("message", messageObject);

    setNewMessage("");
  };

  return (
    <div>
      <MessageList messages={messages} />
      <MessageInput
        newMessage={newMessage}
        username={username}
        onNewMessageChange={(event) => setNewMessage(event.target.value)}
        onUsernameChange={(event) => setUsername(event.target.value)}
        onSend={handleSubmit}
      />
    </div>
  );
}

export default ChatRoom;
