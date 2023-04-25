import React from 'react';

function ChatForm({ handleSubmit, newMessage, setNewMessage, username, setUsername }) {
  return (
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
  );
}

export default ChatForm;
