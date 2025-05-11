const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Executive-only routes
router.post('/executive/book', authMiddleware, roleMiddleware(['executive']), appointmentController.bookAppointmentByExecutive);
router.put('/approve/:id', authMiddleware, roleMiddleware(['executive']), appointmentController.approveAppointment);
router.get('/all', authMiddleware, roleMiddleware(['executive']), appointmentController.getAllAppointments);
router.get('/search/:query', authMiddleware, roleMiddleware(['executive']), appointmentController.searchAppointments);

module.exports = router;
