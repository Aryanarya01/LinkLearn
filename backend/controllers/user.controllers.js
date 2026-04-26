import Profile from "../models/profile.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json("All fields are required");
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already Exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });
    const profile = new Profile({ userId: newUser._id });
    await profile.save();
    return res.status(200).json({ message: "User Registered Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error!" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(404).json({ message: "Authentication Error!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true on deployed, false local
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });
    return res.status(200).json({ message: "Login Successfull" });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Server error!" });
  }
};

export const uploadUserProfile = async (req, res) => {
  try {
     
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
