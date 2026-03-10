import { registerUser, verifyUser } from "../controllers/userController.js";
import express from "express";
import validate from "../middleware/validate.js";
import { registerSchema } from "../validations/registerSchema.js";
import { verifySchema } from "../validations/verifySchema.js";
const router = express.Router();
router.route("/").post(validate(registerSchema), registerUser);
router.route("/verify").post(validate(verifySchema), verifyUser);
export default router;
