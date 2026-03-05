import { Request, Response } from "express";
import Category from "../models/categoryModel.js";
import { StatusCodes } from "http-status-codes";
export const createCategory = async (req: Request, res: Response) => {
  const categoryData = {
    name: "hamburger",
    description: "this is the category for hamburger",
  };
  try {
    const category = await Category.create(categoryData);
    res.status(StatusCodes.CREATED).json(category);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to create category", error });
  }
};
