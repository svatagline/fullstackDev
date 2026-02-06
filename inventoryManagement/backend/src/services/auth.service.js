import User from "../models/User.model.js";

export const findUserByEmail = (email) => {
  return User.findOne({ email });
};
