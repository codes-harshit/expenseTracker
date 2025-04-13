import { Types } from "mongoose";
import { Income } from "../models/income.model.js";
import { Expense } from "../models/expense.model.js";

export const getDashboardData = async (req, res) => {
  const userId = req.user._id;

  try {
    const userObjectId = new Types.ObjectId(String(userId));

    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$amount" },
        },
      },
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: null,
          totalExpense: { $sum: "$amount" },
        },
      },
    ]);

    const last60daysIncomeTransaction = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast60Days = last60daysIncomeTransaction.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    const last30daysExpenseTransaction = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expensesLast30Days = last30daysExpenseTransaction.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    const lastTransactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "income",
        })
      ),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "expense",
        })
      ),
    ].sort((a, b) => b.date - a.date); //Sort latest first

    res.json({
      totalBalance:
        (totalIncome[0]?.totalIncome || 0) -
        (totalExpense[0]?.totalExpense || 0),
      totalIncome: totalIncome[0]?.totalIncome || 0,
      totalExpense: totalExpense[0]?.totalExpense || 0,
      last30DaysExpenses: {
        total: expensesLast30Days,
        transactions: last30daysExpenseTransaction,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60daysIncomeTransaction,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
