import User from "../models/User.js";
import bcrypt from "bcrypt";

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return user;
};

export const getUserProfile = async (userId) => {
  return await User.findById(userId).select("-password");
};