import express from "express";
import {
  addEmployee,
  getAllEmployees,getEmployee,editEmployee,removeEmployee
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
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  getEmployee
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  editEmployee
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  removeEmployee
);
export default router;