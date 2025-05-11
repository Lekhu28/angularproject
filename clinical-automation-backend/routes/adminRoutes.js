const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Only Admin can access these routes
router.get('/users/:role', authMiddleware, roleMiddleware(['admin']), adminController.getUsersByRole);
router.delete('/user/:userId', authMiddleware, roleMiddleware(['admin']), adminController.deleteUser);
router.get('/search-users', authMiddleware, roleMiddleware(['admin']), adminController.searchUsers);

module.exports = router;
