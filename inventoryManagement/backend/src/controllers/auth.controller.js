import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt.js";
import { io } from "../socket/socket.js";
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const match = password === user.password;
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken({ id: user._id, role: user.role });

  if (user.role === "admin") {
    io.to("data").emit("admin:enter", user);
  }

  res.json({
    token,
    role: user.role,
    name: user.name,
  });
};
