import { registerUser } from "../controllers/userController.js";
import express from "express";
import validate from "../middleware/validate.js";
import { registerSchema } from "../validations/registerSchema.js";
const router = express.Router();
router.route("/").post(validate(registerSchema), registerUser);
export default router;
