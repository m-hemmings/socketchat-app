import React from 'react';

function MessageList({ messages }) {
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <span>{message.username}: </span>
          <span>{message.content.text}</span>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
