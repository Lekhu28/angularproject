const Doctor = require('../models/Dr');
const Appointment = require('../models/Appointment');
const Query = require('../models/Query');


exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};


exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.user.id, status: 'Approved' })
      .populate('patient', 'name email');
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};


exports.getMyQueries = async (req, res) => {
  try {
    const queries = await Query.find({ doctor: req.user.id })
      .populate('patient', 'name email');
    res.json(queries);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};


exports.respondToQuery = async (req, res) => {
  const { answer } = req.body;
  try {
    const query = await Query.findById(req.params.id);
    if (!query || query.doctor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized or not found' });
    }

    query.answer = answer;
    await query.save();

    res.json({ message: 'Response sent', query });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
