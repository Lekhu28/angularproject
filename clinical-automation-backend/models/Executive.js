const mongoose = require('mongoose');

const executiveSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contactNumber: { type: String, required: true }
});

module.exports = mongoose.model('Executive', executiveSchema);
