const Message = require('../models/Message');
const Appointment = require('../models/Appointment');

// Send a message/query from a patient to a doctor
exports.sendMessage = async (req, res) => {
  const { doctorId, query } = req.body;
  const patientId = req.user.id;

  try {
    // Check if the patient has already sent 2 queries within a week
    const patientMessages = await Message.find({
      patient: patientId,
      doctor: doctorId,
      dateOfQuery: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // 1 week period
    });

    if (patientMessages.length >= 2) {
      return res.status(400).json({ message: 'Only two queries are allowed per week.' });
    }

    // Create a new message for the doctor
    const message = new Message({
      patient: patientId,
      doctor: doctorId,
      query
    });

    await message.save();
    res.status(201).json({ message: 'Query sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// View incoming messages (queries) for doctors
exports.viewMessages = async (req, res) => {
  const doctorId = req.user.id;

  try {
    const messages = await Message.find({ doctor: doctorId, response: { $eq: '' } }).populate('patient doctor');
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Respond to a patient query (Doctor only)
exports.respondToQuery = async (req, res) => {
  const { messageId, response } = req.body;
  const doctorId = req.user.id;

  try {
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Check if the doctor is the one the message is addressed to
    if (message.doctor.toString() !== doctorId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    message.response = response;
    message.dateOfResponse = Date.now();
    await message.save();

    res.json({ message: 'Response sent successfully', message });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
