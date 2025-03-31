import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  addIncome,
  deleteIncome,
  downloadIncomeExcel,
  getAllIncome,
} from "../controllers/income.controller.js";

const incomeRoutes = Router();

incomeRoutes.post("/add", protectRoute, addIncome);
incomeRoutes.delete("/:id", protectRoute, deleteIncome);
incomeRoutes.get("/get", protectRoute, getAllIncome);
incomeRoutes.get("/download-excel", protectRoute, downloadIncomeExcel);

export default incomeRoutes;
