const http = require('http');
const socketio = require('socket.io');
const { connectToDB } = require('./utilities/db');
const configureSocket = require('./utilities/socket');

// Connect to MongoDB database
connectToDB();

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});

const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Configure socket
configureSocket(io);

server.listen(3123, () => {
  console.log('Server running at http://localhost:3123/');
});
