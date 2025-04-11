import express, { Router } from "express";
import {
  getUserInfo,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.post("/upload-image", upload.single("image"), (req, res) => {
  console.log("req.file", req.file);
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imageUrl });
});

authRouter.get("/getUser", protectRoute, getUserInfo);
export default authRouter;
