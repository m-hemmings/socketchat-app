const { Message, MessageModel } = require('./message');

module.exports = function(io) {
  io.on('connection', async (socket) => {
    console.log('A user connected');

    // Retrieve and send previous messages
    try {
      const messages = await MessageModel.find().sort({ timestamp: -1 }).limit(10).exec();
      socket.emit('previous-messages', messages.map(m => Message.fromJSON(m.toJSON())));
    } catch (err) {
      console.error(err);
    }

    // Handle incoming messages
    socket.on('message', async (message) => {
      console.log(`Received message: ${JSON.stringify(message)}`);

      // Broadcast the content of the message object to all connected clients
      io.emit('message', message);

      // Save message to database
      const newMessage = new MessageModel({ 
        username: message.username,
        content: {
          text: message.content.text,
          timestamp: new Date().getTime()
        }
      });

      try {
        await newMessage.save();
      } catch (err) {
        console.error(err);
      }
    });

    // Handle disconnections
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};
