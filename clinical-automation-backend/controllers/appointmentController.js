const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Doctor = require('../models/Dr');

exports.bookAppointmentByExecutive = async (req, res) => {
  try {
    const { patientId, doctorId, date, time } = req.body;

    const patient = await User.findById(patientId);
    const doctor = await Doctor.findById(doctorId);
    if (!patient || !doctor) return res.status(404).json({ message: 'Patient or doctor not found' });

    const appointment = new Appointment({
      patientId,
      patientName: patient.name,
      doctorId,
      doctorName: doctor.name,
      date,
      time,
      status: 'approved',
      bookedBy: 'executive'
    });

    await appointment.save();
    res.status(201).json({ message: 'Appointment booked and approved', appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.approveAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    appointment.status = 'approved';
    await appointment.save();
    res.json({ message: 'Appointment approved', appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('patientId doctorId');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.searchAppointments = async (req, res) => {
  try {
    const { query } = req.params;
    const patients = await User.find({
      $or: [
        { _id: query },
        { name: { $regex: new RegExp(query, 'i') } }
      ]
    });

    const patientIds = patients.map(p => p._id);
    const appointments = await Appointment.find({ patientId: { $in: patientIds } }).populate('patientId doctorId');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
