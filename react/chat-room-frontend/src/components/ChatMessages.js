import React from 'react';

function ChatMessages({ messages }) {  
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <span>{message.username}: </span>
          <span>{message.content && message.content.text}</span>
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;
