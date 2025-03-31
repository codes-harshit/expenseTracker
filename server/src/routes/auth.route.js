import express, { Router } from "express";
import {
  getUserInfo,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.get("/getUser", protectRoute, getUserInfo);
export default authRouter;
