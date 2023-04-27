import React, { useState } from 'react';
import UsernameModal from './UsernameModal';
import { setUsername } from '../utilities/user';

function ChatForm({ inputRef, message, setNewMessage, handleSubmit, setUsernameCallback, username }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalSubmit = (event) => {
    setUsername(event, setUsernameCallback);
    setModalVisible(false);
  };

  return (
    <div className="chat-form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(event) => setNewMessage(event.target.value)}
          ref={inputRef}
          required
        />
        <button type="submit">Send</button>
      </form>
      <button onClick={() => setModalVisible(true)}>Change username</button>
      <UsernameModal showModal={modalVisible} handleModalSubmit={handleModalSubmit} handleModalCancel={() => setModalVisible(false)}>
        <h2>Change username</h2>
        <form onSubmit={handleModalSubmit}>
          <label htmlFor="username">New username:</label>
          <input type="text" id="username" name="username" required />
          <button type="submit">Change</button>
        </form>
      </UsernameModal>
      <p>Logged in as: {username}</p>
    </div>
  );
}

export default ChatForm;
