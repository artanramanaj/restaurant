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
import { upload } from "../middleware/uploadMiddleware.js";
import validate from "../middleware/validate.js";
import { productSchema } from "../validations/productSchema.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
router
  .route("/")
  .post(
    protect,
    adminOnly,
    upload.single("image"),
    validate(productSchema),
    createProduct,
  )
  .get(getProducts);
router.route("/total").get(protect, adminOnly, getTotalProducts);
router
  .route("/:id")
  .get(getProduct)
  .put(
    protect,
    adminOnly,
    upload.single("image"),
    validate(productSchema),
    updateProduct,
  )
  .delete(protect, adminOnly, deleteProduct);
export default router;
