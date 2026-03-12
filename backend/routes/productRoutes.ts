import express from "express";
const router = express.Router();
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getTotalProducts,
} from "../controllers/productController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
router.route("/").post(protect, adminOnly, createProduct).get(getProducts);
router.route("/total").get(protect, adminOnly, getTotalProducts);
router
  .route("/:id")
  .get(getProduct)
  .put(protect, adminOnly, updateProduct)
  .delete(protect, adminOnly, deleteProduct);
export default router;
