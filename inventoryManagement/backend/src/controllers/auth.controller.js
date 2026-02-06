import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken({ id: user._id, role: user.role });

  res.json({
    token,
    role: user.role,
  });
};
