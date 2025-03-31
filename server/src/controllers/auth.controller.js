import express from "express";
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../lib/utils.js";

export const signup = async (req, res) => {
  const { fullName, email, password, profilePic } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!email || !fullName || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    const newUser = new User({
      fullName,
      email,
      password,
      profilePic,
    });

    if (newUser) {
      generateTokenAndSetCookie(res, newUser._id);
      await newUser.save();

      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "User not created!",
      });
    }
  } catch (error) {
    console.log("Erron in signing up", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Error: Signing up",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required!",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No such user found, please sign up!",
      });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    generateTokenAndSetCookie(res, user._id);
    return res.status(200).json({
      ...user._doc,
      password: undefined,
    });
  } catch (error) {
    console.log("Erron in Loging in", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Error: Logining in",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });

    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log("Erron in Loging out", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Error: Logining out",
    });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in userInfo", error);
    return res.status(500).json({
      message: "Interval server error: getUserInfo",
    });
  }
};
