import express from "express";
import {
  addSite,
  getAllSites,
  getSite,
  editSite,
  removeSite,
} from "../controllers/siteController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { validateSite } from "../validators/siteValidator.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  validateSite,
  addSite
);

router.get("/", authMiddleware, roleMiddleware("admin"), getAllSites);

router.get("/:id", authMiddleware, roleMiddleware("admin"), getSite);

router.put("/:id", authMiddleware, roleMiddleware("admin"), editSite);

router.delete("/:id", authMiddleware, roleMiddleware("admin"), removeSite);

export default router;