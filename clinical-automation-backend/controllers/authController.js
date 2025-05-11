const Patient = require('../models/Patient');
const Doctor = require('../models/Dr');
const Pharmacist = require('../models/Pharmacist');
const Executive = require('../models/Executive');
const Admin = require('../models/Admin');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { captcha } = require('../utils/captcha');

exports.register = async (req, res) => {
  // Validate incoming data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, role, dob, contactNumber, address, specialization, experience, availableTimings } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    // Role-specific data insertion
    switch (role) {
      case 'patient':
        await Patient.create({ userId: user._id, dob, contactNumber, address });
        break;
      case 'doctor':
        await Doctor.create({ userId: user._id, specialization, experience, availableTimings });
        break;
      case 'pharmacist':
        await Pharmacist.create({ userId: user._id, contactNumber });
        break;
      case 'executive':
        await Executive.create({ userId: user._id, contactNumber });
        break;
      case 'admin':
        await Admin.create({ userId: user._id, contactNumber });
        break;
      default:
        return res.status(400).json({ message: 'Invalid role' });
    }

    // Send success response
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.login = async (req, res) => {
  const { email, password, captcha, sessionId } = req.body;

  try {
    // Validate captcha and session
    const captchaValidation = captcha === generateCaptcha(sessionId);
    if (!captchaValidation) {
      return res.status(400).json({ message: 'Invalid captcha' });
    }

    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    // Sign the token and send response
    jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
