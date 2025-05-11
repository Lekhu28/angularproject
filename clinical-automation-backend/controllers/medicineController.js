const Medicine = require('../models/Medicine');

// Add new medicine
exports.addMedicine = async (req, res) => {
  try {
    const med = new Medicine(req.body);
    await med.save();
    res.status(201).json({ message: 'Medicine added', medicine: med });
  } catch (err) {
    res.status(500).json({ message: 'Error adding medicine', error: err.message });
  }
};

// Update medicine
exports.updateMedicine = async (req, res) => {
  try {
    const med = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!med) return res.status(404).json({ message: 'Medicine not found' });
    res.json({ message: 'Medicine updated', medicine: med });
  } catch (err) {
    res.status(500).json({ message: 'Error updating medicine', error: err.message });
  }
};

// Delete medicine
exports.deleteMedicine = async (req, res) => {
  try {
    const med = await Medicine.findByIdAndDelete(req.params.id);
    if (!med) return res.status(404).json({ message: 'Medicine not found' });
    res.json({ message: 'Medicine deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting medicine', error: err.message });
  }
};

// Get all medicines
exports.getMedicines = async (req, res) => {
  try {
    const meds = await Medicine.find();
    res.json(meds);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching medicines', error: err.message });
  }
};

// Search medicine by name
exports.searchMedicine = async (req, res) => {
  const { name } = req.query;
  try {
    const meds = await Medicine.find({ name: new RegExp(name, 'i') });
    res.json(meds);
  } catch (err) {
    res.status(500).json({ message: 'Error searching medicine', error: err.message });
  }
};
