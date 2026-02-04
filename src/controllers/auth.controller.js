import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.log("Login error:", error);
    return res.status(500).json({ message: "Server Error!" });
  }
};

export const theMeFunction = async (req, res) => {
  try {
    const userId = req.user.id
    const user = await User.findById(userId).select("-password")

    if(!user) return res.status(404).json({message: "User not found!"})

    return res.status(200).json(user)

  } catch (error) {
    console.log("Fetching user error:", error);
    return res.status(500).json({ message: "Server Error!" });
  }
}