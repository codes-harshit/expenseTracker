import { Expense } from "../models/expense.model.js";
import xlsx from "xlsx";

export const addExpense = async (req, res) => {
  const { category, amount, date, icon } = req.body;

  if (!category || !amount) {
    return res.status(400).json({
      message: "category and amount are both required!",
    });
  }
  try {
    const owner = req.user._id;

    const newExpense = new Expense({
      userId: owner,
      category: category,
      amount: amount,
      icon: icon,
      date: date ? new Date(date) : Date.now(),
    });

    await newExpense.save();

    return res.status(201).json(newExpense);
  } catch (error) {
    console.log("Erron in adding enpense", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Error: Add expense",
    });
  }
};

export const getAllExpense = async (req, res) => {
  const userId = req.user._id;
  try {
    const allExpense = await Expense.find({ userId });

    if (!allExpense) {
      return res.status(400).json({
        message: "No Expense",
      });
    }

    return res.status(200).json(allExpense);
  } catch (error) {
    console.log("Erron in getting expense", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Error: Get Expense",
    });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(400).json({
        message: "Unable to delete: No Expense",
      });
    }

    return res.status(200).json({
      message: "Expense deleted",
      deletedExpense,
    });
  } catch (error) {
    console.log("Error in Deleting expense", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Error: delete expense",
    });
  }
};

export const downloadExpenseExcel = async (req, res) => {
  const userId = req.user._id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    const data = expense.map((item) => ({
      category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "expense");
    xlsx.writeFile(wb, "expense_details.xlsx");
    res.download("expense_details.xlsx");
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
