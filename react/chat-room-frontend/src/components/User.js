import React from 'react';

function User(props) {
  return (
    <div className="user">
      <span>{props.username}</span>
    </div>
  );
}

export default User;