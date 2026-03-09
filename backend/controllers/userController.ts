import User from "../models/userModel.js";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { customError } from "../middleware/errorHandler.js";
import asyncHandler from "express-async-handler";
import { hashPassword } from "../utils/passwordUtils.js";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new customError(
        `User with email ${email} already exist`,
        StatusCodes.BAD_REQUEST,
      );
    }

    const hashedPassword = await hashPassword(password);
    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res
      .status(StatusCodes.CREATED)
      .json({ message: "User registered successfully" });
  },
);
