import User from "../models/userModel.js";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { customError } from "../middleware/errorHandler.js";
import asyncHandler from "express-async-handler";
import { hashPassword, hashCode, compareCode } from "../utils/passwordUtils.js";
import { createTransporter } from "../utils/nodemailer.js";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    if (!process.env.EMAIL || !process.env.PASS) {
      throw new customError(
        `${process.env.EMAIL} email not found`,
        StatusCodes.NOT_FOUND,
      );
    }
    let userRole = "user";
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new customError(
        `User with email ${email} already exist`,
        StatusCodes.BAD_REQUEST,
      );
    }

    const count = await User.countDocuments({});
    if (!count) {
      userRole = "admin";
    }

    const verificationCodePlain = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const hashedVerificationCode = await hashCode(verificationCodePlain);
    const verificationCodeExpires = new Date(Date.now() + 15 * 60 * 1000);

    const hashedPassword = await hashPassword(password);
    await User.create({
      username,
      email,
      password: hashedPassword,
      role: userRole,
      verificationCode: hashedVerificationCode,
      verificationCodeExpires,
    });

    await createTransporter().sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Verify Your Account",
      html: `<p>Your verification code is: <strong>${verificationCodePlain}</strong>. This code expires in 15 minutes.</p>`,
    });

    res
      .status(StatusCodes.CREATED)
      .json({ message: "User registered successfully" });
  },
);

export const verifyUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, code } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new customError("User not found", StatusCodes.NOT_FOUND);
  }

  if (user.isVerified) {
    throw new customError("User already verified", StatusCodes.BAD_REQUEST);
  }

  if (!user.verificationCode || !user.verificationCodeExpires) {
    throw new customError(
      "No verification code found",
      StatusCodes.BAD_REQUEST,
    );
  }

  const isExpired = new Date() > user.verificationCodeExpires;
  if (isExpired) {
    throw new customError("Verification code expired", StatusCodes.BAD_REQUEST);
  }

  const isMatch = await compareCode(code, user.verificationCode);
  if (!isMatch) {
    throw new customError("Invalid verification code", StatusCodes.BAD_REQUEST);
  }

  user.isVerified = true;
  user.verificationCode = undefined;
  user.verificationCodeExpires = undefined;
  await user.save();

  res.status(StatusCodes.OK).json({ message: "Account verified successfully" });
});
