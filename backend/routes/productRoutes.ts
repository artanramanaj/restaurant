import express from "express";
const router = express.Router();
import { createProduct } from "../controllers/productController.js";

router.route("/").post(createProduct);
export default router;
