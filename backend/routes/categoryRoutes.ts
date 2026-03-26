import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getTotalCategories,
  getCategory,
} from "../controllers/categoryController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
const router = express.Router();
router.route("/").post(createCategory).get(getCategories);
router.route("/total").get(protect, adminOnly, getTotalCategories);
router
  .route("/:id")
  .put(protect, adminOnly, updateCategory)
  .get(protect, adminOnly, getCategory);
router.route("/:id").delete(deleteCategory);
export default router;
