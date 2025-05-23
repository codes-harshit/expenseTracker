import { Income } from "../models/income.model.js";
import xlsx from "xlsx";

export const addIncome = async (req, res) => {
  const { source, amount, date, icon } = req.body;

  if (!source || !amount) {
    return res.status(400).json({
      message: "Source and amount are both required!",
    });
  }
  try {
    const owner = req.user._id;

    const newIncome = new Income({
      userId: owner,
      source: source,
      amount: amount,
      icon: icon,
      date: date ? new Date(date) : Date.now(),
    });

    await newIncome.save();

    return res.status(201).json(newIncome);
  } catch (error) {
    console.log("Erron in adding income", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Error: Add Income",
    });
  }
};

export const getAllIncome = async (req, res) => {
  const userId = req.user._id;
  try {
    const allIncome = await Income.find({ userId });

    if (!allIncome) {
      return res.status(400).json({
        message: "No Income",
      });
    }

    return res.status(200).json(allIncome);
  } catch (error) {
    console.log("Erron in getting income", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Error: Get Income",
    });
  }
};

export const deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedIncome = await Income.findByIdAndDelete(id);

    if (!deleteIncome) {
      return res.status(400).json({
        message: "Unable to delete: No Income",
      });
    }

    return res.status(200).json({
      message: "Income deleted",
      deletedIncome,
    });
  } catch (error) {
    console.log("Erron in Deleting income", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Error: delete Income",
    });
  }
};

export const downloadIncomeExcel = async (req, res) => {
  const userId = req.user._id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    const data = income.map((item) => ({
      source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "income");
    xlsx.writeFile(wb, "income_details.xlsx");
    res.download("income_details.xlsx");
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
