import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  createLeave,
  myLeaves,
  allLeaves,
  approveRejectLeave,
} from "../controllers/leaveController.js";
import { validateLeave } from "../validators/leaveValidator.js";






const router = express.Router();

// ================= EMPLOYEE =================

// Apply Leave
router.post(
  "/apply",
  authMiddleware,
  validateLeave,
  createLeave
);
// My Leaves
router.get(
  "/my-leaves",
  authMiddleware,
  myLeaves
);

// ================= ADMIN =================

// All Leave Requests
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  allLeaves
);

// Approve / Reject Leave
router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  approveRejectLeave
);

export default router;