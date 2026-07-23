import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createLeave,
  myLeaves,
  allLeaves,approveRejectLeave
} from "../controllers/leaveController.js";

const router = express.Router();

// Employee
router.post("/apply", authMiddleware, createLeave);
router.get("/my-leaves", authMiddleware, myLeaves);

// Admin
router.get("/", authMiddleware, allLeaves);

// Approve or Reject Leave Request
router.patch(
  "/:id",
  authMiddleware,
  approveRejectLeave
);
export default router;