const Query = require('../models/Query');
const Appointment = require('../models/Appointment');

// Patient sends a query
exports.sendQuery = async (req, res) => {
  const { doctorId, message } = req.body;
  const patientId = req.user.id;

  try {
    // Check if valid appointment exists within 7 days
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const appointment = await Appointment.findOne({
      patientId,
      doctorId,
      date: { $gte: oneWeekAgo },
      status: 'approved'
    });

    if (!appointment) {
      return res.status(403).json({ message: 'No valid recent appointment found with this doctor.' });
    }

    const count = await Query.countDocuments({ patientId, doctorId, sentAt: { $gte: oneWeekAgo } });
    if (count >= 2) {
      return res.status(403).json({ message: 'Only two queries allowed within one week of visit.' });
    }

    const query = new Query({ patientId, doctorId, message });
    await query.save();

    res.status(201).json({ message: 'Query sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Doctor replies to a query
exports.replyToQuery = async (req, res) => {
  const doctorId = req.user.id;
  const { id } = req.params;
  const { reply } = req.body;

  try {
    const query = await Query.findById(id);
    if (!query) return res.status(404).json({ message: 'Query not found' });

    if (query.doctorId.toString() !== doctorId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    query.reply = reply;
    query.repliedAt = new Date();
    await query.save();

    res.json({ message: 'Reply sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Doctor view inbox
exports.getDoctorInbox = async (req, res) => {
  const doctorId = req.user.id;

  try {
    const queries = await Query.find({ doctorId }).populate('patientId', 'name email');
    res.json(queries);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
