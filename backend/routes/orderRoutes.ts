import express from "express";
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  getTotalOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";
import { orderSchema } from "../validations/orderSchema.js";
const router = express.Router();

router
  .route("/")
  .post(validate(orderSchema), createOrder)
  .get(protect, adminOnly, getOrders);
router.route("/total").get(protect, adminOnly, getTotalOrders);
router
  .route("/:id")
  .get(protect, adminOnly, getOrder)
  .delete(protect, adminOnly, deleteOrder);
router.route("/:id/status").put(protect, adminOnly, updateOrderStatus);

export default router;
