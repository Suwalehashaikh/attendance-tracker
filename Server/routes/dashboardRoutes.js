import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { dashboard } from "../controllers/dashboardController.js";

const router = express.Router();

// Admin + Supervisor Dashboard
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin", "supervisor"),
  dashboard
);

export default router;