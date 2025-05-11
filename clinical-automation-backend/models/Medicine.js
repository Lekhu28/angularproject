const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  basePrice: { type: Number, required: true },
  tax: { type: Number, default: 0 }, // percent
  discount: { type: Number, default: 0 }, // percent
  stock: { type: Number, default: 0 }
}, { timestamps: true });

medicineSchema.virtual('finalPrice').get(function () {
  const taxAmount = (this.basePrice * this.tax) / 100;
  const discountAmount = (this.basePrice * this.discount) / 100;
  return this.basePrice + taxAmount - discountAmount;
});

medicineSchema.set('toJSON', { virtuals: true });
medicineSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Medicine', medicineSchema);
