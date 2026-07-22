import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createLeave,
  myLeaves,
  allLeaves,
} from "../controllers/leaveController.js";

const router = express.Router();

// Employee
router.post("/apply", authMiddleware, createLeave);
router.get("/my-leaves", authMiddleware, myLeaves);

// Admin
router.get("/", authMiddleware, allLeaves);

export default router;