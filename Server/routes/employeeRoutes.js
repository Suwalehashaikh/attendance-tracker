import express from "express";
import {
  addEmployee,
  getAllEmployees,
} from "../controllers/employeeController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { validateEmployee } from "../validators/employeeValidator.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  validateEmployee,
  addEmployee
);
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getAllEmployees
);
export default router;