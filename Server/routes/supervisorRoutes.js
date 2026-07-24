import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

import {
  supervisorWorkers,
  supervisorLeaves,
  approveRejectSupervisorLeave,
} from "../controllers/supervisorController.js";

const router = express.Router();

// Supervisor Workers
// Workers
router.get(
  "/workers",
  authMiddleware,
  roleMiddleware("supervisor"),
  supervisorWorkers
);

// Leave List
router.get(
  "/leaves",
  authMiddleware,
  roleMiddleware("supervisor"),
  supervisorLeaves
);

// Leave Approval
router.patch(
  "/leaves/:id",
  authMiddleware,
  roleMiddleware("supervisor"),
  approveRejectSupervisorLeave
);
export default router;