import Profile from "../models/profile.model";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import crypto from "crypto";
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

    const token = crypto.randomBytes(32).toString("hex");
    await User.updateOne({ _id: user._id }, { token });
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: "Server error!" });
  }
};
