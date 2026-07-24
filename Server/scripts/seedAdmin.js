import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/User";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    // Check if admin already exists
    const existingAdmin = await User.findOne({
      email: "suwalehashaikh8@gmail.com",
    });

    if (existingAdmin) {
      console.log("❌ Admin already exists");
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("suwaleha", 10);

    // Create admin
    await User.create({
  name: "Suwaleha",
  email: "suwalehashaikh8@gmail.com",
  password: hashedPassword,
  role: "admin",
  isActive: true,
});
    

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();