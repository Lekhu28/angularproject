const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Patient sends query
router.post('/send', authMiddleware, roleMiddleware(['patient']), queryController.sendQuery);

// Doctor replies to query
router.put('/reply/:id', authMiddleware, roleMiddleware(['doctor']), queryController.replyToQuery);

// Doctor inbox
router.get('/inbox', authMiddleware, roleMiddleware(['doctor']), queryController.getDoctorInbox);

module.exports = router;
