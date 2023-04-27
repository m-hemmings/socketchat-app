import React, { useState } from 'react';

function UsernameModal({ showModal, handleModalSubmit, handleModalCancel }) {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    handleModalSubmit(event, username);
  };

  return (
    <>
      {showModal && (
        <div className="modal">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={username}
              onChange={handleUsernameChange}
            />
            <button type="submit">Set username</button>
            <button onClick={handleModalCancel}>Cancel</button>
          </form>
        </div>
      )}
    </>
  );
}

export default UsernameModal;
