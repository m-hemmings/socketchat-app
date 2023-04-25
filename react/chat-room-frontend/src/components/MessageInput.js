import React from 'react';

function MessageInput({ newMessage, username, onNewMessageChange, onUsernameChange, onSend }) {
  return (
    <form onSubmit={onSend}>
      <input
        type="text"
        value={newMessage}
        onChange={onNewMessageChange}
        placeholder="Enter message"
      />
      <input
        type="text"
        value={username}
        onChange={onUsernameChange}
        placeholder="Enter username"
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default MessageInput;
