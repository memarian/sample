const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userType: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId },
  category: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  url: String,
  cover: String,
});

module.exports = mongoose.model('Message', messageSchema);
