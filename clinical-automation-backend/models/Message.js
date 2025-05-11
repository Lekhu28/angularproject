const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  query: {
    type: String,
    required: true
  },
  response: {
    type: String,
    default: ''
  },
  dateOfQuery: { type: Date, default: Date.now },
  dateOfResponse: { type: Date }
});

module.exports = mongoose.model('Message', messageSchema);
