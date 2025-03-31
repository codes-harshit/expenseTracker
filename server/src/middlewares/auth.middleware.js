import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: No Token!",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(401).json({
        message: "Unauthorized: Invalid Token!",
      });
    }
    const user = await User.findById(decodedToken.userId).select("-password");

    req.user = user;
    next();
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      success: false,
      message: "Interval server error: protectRoute",
    });
  }
};
