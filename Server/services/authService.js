import User from "../models/User.js";
import Employee from "../models/Employee.js";
import bcrypt from "bcrypt";

// ================= Admin Login =================

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

// ================= Employee Login =================

export const loginEmployee = async (email, password) => {
  const employee = await Employee.findOne({ email }).populate(
    "site",
    "siteName siteCode city latitude longitude radius"
  );

  if (!employee) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, employee.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  if (!employee.isActive) {
    throw new Error("Employee account is inactive");
  }

  return employee;
};

// ================= Admin Profile =================

export const getUserProfile = async (userId) => {
  return await User.findById(userId).select("-password");
};

// ================= Employee Profile =================

export const getEmployeeProfile = async (employeeId) => {
  return await Employee.findById(employeeId)
    .select("-password")
    .populate("site", "siteName siteCode city latitude longitude radius");
};