const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const doctorController = require('../controllers/drController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');


router.get('/', doctorController.getAllDoctors);


router.get('/appointments', authMiddleware, roleMiddleware(['doctor']), doctorController.getMyAppointments);


router.get('/queries', authMiddleware, roleMiddleware(['doctor']), doctorController.getMyQueries);


router.post(
  '/queries/respond/:id',
  authMiddleware,
  roleMiddleware(['doctor']),
  [check('answer', 'Answer is required').notEmpty()],
  doctorController.respondToQuery
);

module.exports = router;
