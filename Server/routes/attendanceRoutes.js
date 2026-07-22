import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  validateCheckIn,validateCheckOut
} from "../validators/attendanceValidator.js";
import {
  checkIn,
  checkOut,
  myAttendance,
  getAttendance,
} from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/check-in", authMiddleware, validateCheckIn, checkIn);

router.post("/check-out", authMiddleware, validateCheckOut, checkOut);

router.get("/", authMiddleware, getAttendance);

router.get("/my-attendance", authMiddleware, myAttendance);

export default router;