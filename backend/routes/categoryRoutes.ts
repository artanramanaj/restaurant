import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getTotalCategories,
  getCategory,
} from "../controllers/categoryController.js";
import validate from "../middleware/validate.js";
import { categorySchema } from "../validations/categorySchema.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
const router = express.Router();
router
  .route("/")
  .post(protect, adminOnly, validate(categorySchema), createCategory)
  .get(getCategories);
router.route("/total").get(protect, adminOnly, getTotalCategories);
router
  .route("/:id")
  .put(protect, adminOnly, validate(categorySchema), updateCategory)
  .get(protect, adminOnly, getCategory)
  .delete(deleteCategory);

export default router;
