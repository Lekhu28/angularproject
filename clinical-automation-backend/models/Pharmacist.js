const mongoose = require('mongoose');

const pharmacistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contactNumber: { type: String, required: true }
});

module.exports = mongoose.model('Pharmacist', pharmacistSchema);
