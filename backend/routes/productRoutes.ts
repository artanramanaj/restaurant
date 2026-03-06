import express from "express";
const router = express.Router();
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

router.route("/").post(createProduct).get(getProducts);
router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);
export default router;
