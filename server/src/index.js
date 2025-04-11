import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/connectDB.js";
import authRouter from "./routes/auth.route.js";
import incomeRoutes from "./routes/income.route.js";
import expenseRoutes from "./routes/expense.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir); //
}

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`The server is running on the: ${port}`);
  connectDB();
});
