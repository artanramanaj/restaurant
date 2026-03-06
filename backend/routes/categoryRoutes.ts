import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
const router = express.Router();
router.route("/").post(createCategory).get(getCategories);
router.route("/:id").put(updateCategory);
router.route("/:id").delete(deleteCategory);
export default router;
