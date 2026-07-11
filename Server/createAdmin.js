import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./models/User.js";

await mongoose.connect(process.env.DB_URL);

const hashedPassword = await bcrypt.hash("Admin@123", 10);

const admin = await User.create({
  name: "Admin",
  email: "admin@gmail.com",
  password: hashedPassword,
  role: "admin",
});

console.log(admin);

process.exit();