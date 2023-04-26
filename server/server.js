const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const { addTimestamps } = require('./utilities/logging');

// Override console.log to include timestamps
console.log = addTimestamps();

// Connect to MongoDB database
mongoose.connect('mongodb://mongo/chat-room', { useNewUrlParser: true, useUnifiedTopology: true });

const MessageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  content: {
    type: Object, // Change the data type to Object
    required: true
  },
  timestamp: { type: Date, default: Date.now },
});

class Message {
  constructor(username, content, timestamp) {
    this.username = username;
    this.content = content;
    this.timestamp = timestamp || new Date();
  }

  static fromJSON(json) {
    return new Message(json.username, json.content, new Date(json.timestamp));
  }
}

Message.schema = MessageSchema;
const MessageModel = mongoose.model('Message', MessageSchema);

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
  MessageModel.find().sort({ timestamp: -1 }).limit(10).exec((err, messages) => {
    if (err) return console.error(err);
    socket.emit('previous-messages', messages.reverse().map(m => Message.fromJSON(m.toJSON())));
  });

  // Handle incoming messages
  socket.on('message', (message) => {
    console.log(`Received message: ${JSON.stringify(message)}`);

    // Broadcast the message to all connected clients
    io.emit('message', message);

    // Save message to database
    const newMessage = new MessageModel({ 
      username: message.username,
      content: message.content 
    });

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
