import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  addExpense,
  deleteExpense,
  downloadExpenseExcel,
  getAllExpense,
} from "../controllers/expense.controller.js";

const expenseRoutes = Router();

expenseRoutes.post("/add", protectRoute, addExpense);
expenseRoutes.delete("/:id", protectRoute, deleteExpense);
expenseRoutes.get("/get", protectRoute, getAllExpense);
expenseRoutes.get("/download-excel", protectRoute, downloadExpenseExcel);

export default expenseRoutes;
