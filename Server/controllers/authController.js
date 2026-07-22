import generateToken from "../utils/generateToken.js";
import {
  loginUser,
  loginEmployee,
  getUserProfile,
  getEmployeeProfile,
} from "../services/authService.js";

// ================= ADMIN LOGIN =================

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const user = await loginUser(email, password);

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= EMPLOYEE LOGIN =================

export const employeeLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const employee = await loginEmployee(email, password);

    const token = generateToken(employee._id, "employee");

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      employee: {
        id: employee._id,
        employeeId: employee.employeeId,
        name: employee.name,
        email: employee.email,
        designation: employee.designation,
        department: employee.department,
        site: employee.site,
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= ADMIN PROFILE =================

export const profile = async (req, res) => {
  try {
    const user = await getUserProfile(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= EMPLOYEE PROFILE =================

export const employeeProfile = async (req, res) => {
  try {
    const employee = await getEmployeeProfile(req.user.id);

    res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};