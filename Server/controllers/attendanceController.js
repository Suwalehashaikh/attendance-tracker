import {
  checkInEmployee,
  checkOutEmployee,getMyAttendance,getAllAttendance
} from "../services/attendanceService.js";

export const checkIn = async (req, res) => {
  try {
    const attendance = await checkInEmployee(req);

    res.status(201).json({
      success: true,
      message: "Check-in successful",
      attendance,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const checkOut = async (req, res) => {
  try {
    const attendance = await checkOutEmployee(req);

    res.status(200).json({
      success: true,
      message: "Check-out successful",
      attendance,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const myAttendance = async (req, res) => {
  try {
    const attendance = await getMyAttendance(req.user.id);

    res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAttendance = async (req, res) => {
  try {
    const attendance = await getAllAttendance(req.query);

    res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};