import React, { useState, useRef, useEffect } from 'react';
import { setUsername } from '../utilities/user';

function ChatForm({ handleSubmit, newMessage, setNewMessage, setUsernameCallback }) {
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef();

  const handleModalSubmit = (event) => {
    event.preventDefault();
    setUsername(event, setUsernameCallback);
    setShowModal(false);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit(event);
    setNewMessage('');
    inputRef.current.focus();
  };

  useEffect(() => {
  if (inputRef.current) {
    inputRef.current.focus();
  }
}, []);


  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          placeholder="Enter message"
          ref={inputRef}
        />
        <button type="submit">Send</button>
      </form>

      {showModal && (
        <div className="modal">
          <form onSubmit={handleModalSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              id="message-input"
            />
            <button type="submit">Set username</button>
            <button onClick={handleModalCancel}>Cancel</button>
          </form>
        </div>
      )}

      {!showModal && (
        <button onClick={() => setShowModal(true)}>Set username</button>
      )}
    </>
  );
}

export default ChatForm;
