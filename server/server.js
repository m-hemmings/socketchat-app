const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose.connect('mongodb://mongo/chat-room', { useNewUrlParser: true, useUnifiedTopology: true });

const MessageSchema = new mongoose.Schema({
  content: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', MessageSchema);

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

io.on('connection', (socket) => {
  console.log('A user connected');

  // Retrieve and send previous messages
  Message.find().sort({ timestamp: -1 }).limit(10).exec((err, messages) => {
    if (err) return console.error(err);
    socket.emit('previous-messages', messages.reverse());
  });

  // Handle incoming messages
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Broadcast the message to all connected clients
    io.emit('message', message);

    // Save message to database
    const newMessage = new Message({ content: message });
    newMessage.save((err) => {
      if (err) return console.error(err);
    });
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3123, () => {
  console.log('Server running at http://localhost:3123/');
});
