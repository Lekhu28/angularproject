const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const { generateCaptcha } = require('../utils/captcha');

// @route   POST /api/auth/register
// @desc    Register user with captcha
// @access  Public
router.post(
  '/register',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password must be 7 to 10 characters long').isLength({ min: 7, max: 10 }),
    check('role', 'Role is required').notEmpty(),
    check('captcha', 'Captcha is required').notEmpty(),
    check('sessionId', 'Session ID is required').notEmpty()
  ],
  authController.register
);

// @route   POST /api/auth/login
// @desc    Login user with captcha
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
    check('captcha', 'Captcha is required').notEmpty(),
    check('sessionId', 'Session ID is required').notEmpty()
  ],
  authController.login
);

// @route   GET /api/auth/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', authMiddleware, authController.getProfile);

// @route   GET /api/auth/get-captcha/:sessionId
// @desc    Get captcha value for frontend (for demo purposes)
// @access  Public
router.get('/get-captcha/:sessionId', (req, res) => {
  try {
    const captcha = generateCaptcha(req.params.sessionId);
    res.json({ captcha });
  } catch (err) {
    console.error('Captcha generation error:', err);
    res.status(500).json({ message: 'Error generating captcha' });
  }
});

module.exports = router;
