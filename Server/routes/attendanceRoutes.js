import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  validateCheckIn,
  validateCheckOut,
} from "../validators/attendanceValidator.js";
import {
  checkIn,
  checkOut,
  myAttendance,
  getAttendance,
} from "../controllers/attendanceController.js";

const router = express.Router();

// ================= EMPLOYEE =================

// Check In
router.post(
  "/check-in",
  authMiddleware,
  validateCheckIn,
  checkIn
);

// Check Out
router.post(
  "/check-out",
  authMiddleware,
  validateCheckOut,
  checkOut
);

// My Attendance
router.get(
  "/my-attendance",
  authMiddleware,
  myAttendance
);

// ================= ADMIN =================

// All Attendance
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getAttendance
);

export default router;