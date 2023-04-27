import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = "http://localhost:3123";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("user-list", (users) => {
      setUsers(users);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <h2>Users online:</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
