const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  content: {
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }
});

class Message {
  constructor(username, content) {
    this.username = username;
    this.content = content;
  }

  static fromJSON(json) {
    return new Message(json.username, json.content);
  }
}

Message.schema = MessageSchema;
const MessageModel = mongoose.model('Message', MessageSchema);

module.exports = { Message, MessageModel };
