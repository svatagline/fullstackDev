import jwt from "jsonwebtoken";
import { JWT_EXPIRE, JWT_SECRET } from "./constant.js";

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
};
