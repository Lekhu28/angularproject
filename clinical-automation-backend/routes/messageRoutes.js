const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Send a message/query from patient to doctor
router.post('/send', authMiddleware, roleMiddleware(['patient']), messageController.sendMessage);

// View incoming messages (queries) for doctors
router.get('/', authMiddleware, roleMiddleware(['doctor']), messageController.viewMessages);

// Respond to a query (Doctor only)
router.put('/respond', authMiddleware, roleMiddleware(['doctor']), messageController.respondToQuery);

module.exports = router;
