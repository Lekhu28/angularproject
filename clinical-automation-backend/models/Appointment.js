const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientName: { type: String, required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  doctorName: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved'], default: 'pending' },
  bookedBy: { type: String, enum: ['patient', 'executive'], default: 'patient' }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
