const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Pharmacist routes
router.post('/', authMiddleware, roleMiddleware(['pharmacist']), medicineController.addMedicine);
router.put('/:id', authMiddleware, roleMiddleware(['pharmacist']), medicineController.updateMedicine);
router.delete('/:id', authMiddleware, roleMiddleware(['pharmacist']), medicineController.deleteMedicine);

// Public/Patient/Doctor can view/search
router.get('/', authMiddleware, medicineController.getMedicines);
router.get('/search', authMiddleware, medicineController.searchMedicine);

module.exports = router;
