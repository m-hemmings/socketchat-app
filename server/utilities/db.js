const mongoose = require('mongoose');

module.exports.connectToDB = async function() {
  try {
    await mongoose.connect('mongodb://mongo/chat-room', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB database');
  } catch (err) {
    console.error('Failed to connect to MongoDB database:', err);
    process.exit(1);
  }
}
