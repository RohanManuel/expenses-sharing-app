const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  splitMethod: { type: String, enum: ['equal', 'exact', 'percentage'], required: true },
  splitDetails: { type: Map, of: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', expenseSchema);
