import express from "express";
import protect from "../middleware/authMiddleware.js";
//import { protect } from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";
import { getMe, updateProfile } from "../controllers/userController.js";

const router = express.Router();

// 👤 User Profile Routes
router.get("/me", protect, getMe);

router.put(
  "/update",
  protect,
  upload.single("image"), // 👈 CRITICAL
  updateProfile
);
export default router;
