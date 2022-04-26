const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
  type: [{ type: String, required: true, unique: true }],
  locations: [{ type: String, required: true, unique: true }],
  users: [{ type: String, required: true, unique: true }],
  __v: { type: Number, select: false },
});

const Type = mongoose.model('Type', typeSchema);

module.exports = Type;
