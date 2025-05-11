const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  message: { type: String, required: true },
  reply: { type: String },
  sentAt: { type: Date, default: Date.now },
  repliedAt: { type: Date }
});

module.exports = mongoose.model('Query', querySchema);
