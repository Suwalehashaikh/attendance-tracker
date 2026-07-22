import {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
} from "../services/leaveService.js";

// Employee Apply Leave
export const createLeave = async (req, res) => {
  try {
    const leave = await applyLeave(req);

    res.status(201).json({
      success: true,
      message: "Leave applied successfully",
      leave,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Employee My Leaves
export const myLeaves = async (req, res) => {
  try {
    const leaves = await getMyLeaves(req.user.id);

    res.status(200).json({
      success: true,
      count: leaves.length,
      leaves,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin All Leaves
export const allLeaves = async (req, res) => {
  try {
    const leaves = await getAllLeaves();

    res.status(200).json({
      success: true,
      count: leaves.length,
      leaves,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};