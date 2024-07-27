const Expense = require('../models/Expense');
const User = require('../models/User');

exports.addExpense = async (req, res) => {
  try {
    const { description, amount, paidBy, splitMethod, splitDetails } = req.body;

 
    if (splitMethod === 'percentage') {
      const totalPercentage = Object.values(splitDetails).reduce((sum, perc) => sum + perc, 0);
      if (totalPercentage !== 100) {
        return res.status(400).json({ error: 'Percentages must add up to 100%' });
      }
    }

    const expense = new Expense({ description, amount, paidBy, splitMethod, splitDetails });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ paidBy: req.params.userId });
    res.json(expenses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.downloadBalanceSheet = async (req, res) => {

};
