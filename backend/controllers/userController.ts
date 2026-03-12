import User from "../models/userModel.js";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { customError } from "../middleware/errorHandler.js";
import asyncHandler from "express-async-handler";
import {
  hashPassword,
  hashCode,
  compareCode,
  comparePassword,
} from "../utils/passwordUtils.js";
import { generateToken } from "../utils/verificationUtils.js";
import { createTransporter } from "../utils/nodemailerUtils.js";

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

export const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new customError("User does not exist", StatusCodes.NOT_FOUND);
  }

  if (!user.isVerified) {
    throw new customError(
      "Please verify your account first",
      StatusCodes.UNAUTHORIZED,
      "UNVERIFIED_USER",
    );
  }

  const passwordValid = await comparePassword(password, user.password);
  if (!passwordValid) {
    throw new customError("Wrong password", StatusCodes.UNAUTHORIZED);
  }

  const token = generateToken(user._id.toString(), user.username, user.role);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // ← 7 days in milliseconds
  });

  res.status(StatusCodes.OK).json({
    message: "You are logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(StatusCodes.OK).json({ message: "Logged out successfully" });
});

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json(users);
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new customError("User not found", StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json(user);
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById(id).select("+password");

  if (!user) {
    throw new customError("User not found", StatusCodes.NOT_FOUND);
  }

  if (req.body.username) user.username = req.body.username;
  if (req.body.email) user.email = req.body.email;

  if (req.body.password) {
    user.password = await hashPassword(req.body.password);
  }

  await user.save();

  const updatedUser = await User.findById(id);

  res.status(StatusCodes.OK).json(updatedUser);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    throw new customError(
      `User with id ${id} does not exist`,
      StatusCodes.NOT_FOUND,
    );
  }

  res.status(StatusCodes.OK).json({ message: "User deleted successfully" });
});

export const getTotalUsers = asyncHandler(
  async (req: Request, res: Response) => {
    const total = await User.countDocuments({});
    res.status(StatusCodes.OK).json({ total });
  },
);
