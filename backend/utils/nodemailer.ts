import nodemailer from "nodemailer";
import { customError } from "../middleware/errorHandler.js";
import { StatusCodes } from "http-status-codes";

if (!process.env.EMAIL || !process.env.PASS) {
  throw new customError(
    `${process.env.EMAIL} email not found`,
    StatusCodes.NOT_FOUND,
  );
}
export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});
