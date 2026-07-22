import express from "express";
import {
  login,
  employeeLogin,
  profile,
  employeeProfile,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ================= ADMIN =================

router.post("/login", login);

router.get("/profile", authMiddleware, profile);

// ================= EMPLOYEE =================

router.post("/employee/login", employeeLogin);

router.get(
  "/employee/profile",
  authMiddleware,
  employeeProfile
);

export default router;