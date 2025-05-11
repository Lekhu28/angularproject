const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dob: { type: Date, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true }
});

module.exports = mongoose.model('Patient', patientSchema);
