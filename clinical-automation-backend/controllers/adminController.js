const User = require('../models/User');
const Doctor = require('../models/Dr');
const Patient = require('../models/Patient');
const Pharmacist = require('../models/Pharmacist');
const Executive = require('../models/Executive');

// Get all users by role
exports.getUsersByRole = async (req, res) => {
  const { role } = req.params;

  try {
    let data;
    switch (role) {
      case 'doctor':
        data = await Doctor.find();
        break;
      case 'patient':
        data = await Patient.find();
        break;
      case 'pharmacist':
        data = await Pharmacist.find();
        break;
      case 'executive':
        data = await Executive.find();
        break;
      default:
        return res.status(400).json({ message: 'Invalid role' });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

// Delete user by userId
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Delete from role-specific collection
    switch (user.role) {
      case 'doctor':
        await Doctor.findOneAndDelete({ userId });
        break;
      case 'patient':
        await Patient.findOneAndDelete({ userId });
        break;
      case 'pharmacist':
        await Pharmacist.findOneAndDelete({ userId });
        break;
      case 'executive':
        await Executive.findOneAndDelete({ userId });
        break;
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

// Search users by name (optional)
exports.searchUsers = async (req, res) => {
  const { role, name } = req.query;

  try {
    let Model;
    switch (role) {
      case 'doctor':
        Model = Doctor;
        break;
      case 'patient':
        Model = Patient;
        break;
      case 'pharmacist':
        Model = Pharmacist;
        break;
      case 'executive':
        Model = Executive;
        break;
      default:
        return res.status(400).json({ message: 'Invalid role' });
    }

    const results = await Model.find({ name: new RegExp(name, 'i') });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error searching users', error: err.message });
  }
};
