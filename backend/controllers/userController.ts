import User from "../models/userModel.js";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { customError } from "../middleware/errorHandler.js";
import asyncHandler from "express-async-handler";
import { hashPassword, hashCode } from "../utils/passwordUtils.js";
import { transporter } from "../utils/nodemailer.js";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    return;
    const { username, email, password } = req.body;
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

    await transporter.sendMail({
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
