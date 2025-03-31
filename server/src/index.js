import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/connectDB.js";
import authRouter from "./routes/auth.route.js";
import incomeRoutes from "./routes/income.route.js";
import expenseRoutes from "./routes/expense.route.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`The server is running on the: ${port}`);
  connectDB();
});
