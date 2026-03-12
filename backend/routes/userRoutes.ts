import {
  authUser,
  registerUser,
  verifyUser,
  logoutUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getTotalUsers,
} from "../controllers/userController.js";
import express from "express";
import validate from "../middleware/validate.js";
import { registerSchema } from "../validations/registerSchema.js";
import { verifySchema } from "../validations/verifySchema.js";
import { authSchema } from "../validations/authSchema.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
const router = express.Router();
router
  .route("/")
  .post(validate(registerSchema), registerUser)
  .get(protect, adminOnly, getUsers);
router.route("/total").get(protect, adminOnly, getTotalUsers);
router.route("/verify").post(validate(verifySchema), verifyUser);
router.route("/auth").post(validate(authSchema), authUser);
router.route("/logout").post(logoutUser);
router
  .route("/:id")
  .get(protect, adminOnly, getUser)
  .put(protect, adminOnly, updateUser)
  .delete(protect, adminOnly, deleteUser);
export default router;
