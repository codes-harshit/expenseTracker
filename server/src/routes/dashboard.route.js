import { Router } from "express";
import { getDashboardData } from "../controllers/dashboard.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const dashboardRoutes = Router();

dashboardRoutes.get("/", protectRoute, getDashboardData);

export default dashboardRoutes;
