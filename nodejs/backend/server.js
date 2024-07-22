const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 8001;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/../frontend/index.html');
});

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('sendMessage', (message) => {
    io.emit('message', { username: socket.id, message });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
  
  const connectedUsers = Object.keys(io.sockets.connected);
  io.emit('users', connectedUsers);
});

http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
