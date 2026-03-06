import { Request, Response } from "express";
import Category from "../models/categoryModel.js";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import { customError } from "../middleware/errorHandler.js";

export const getCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await Category.find({});
    res.status(StatusCodes.OK).json(categories);
  },
);

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const categoryData = {
      name,
      description,
    };

    if (!name) {
      throw new customError(
        "category must have a name",
        StatusCodes.BAD_REQUEST,
      );
    }

    const category = await Category.create(categoryData);
    res.status(StatusCodes.CREATED).json(category);
  },
);

export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const { id } = req.params;
    const categoryData = {
      name,
      description,
    };
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCategory) {
      throw new customError("category not updated", StatusCodes.BAD_REQUEST);
    }
    res.status(StatusCodes.OK).json(updatedCategory);
  },
);

export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const deleteCategory = await Category.findOneAndDelete({ _id: id });

    if (!deleteCategory) {
      throw new customError(
        `Category with id ${id} not found`,
        StatusCodes.NOT_FOUND,
      );
    }
    res
      .status(StatusCodes.OK)
      .json({ message: "Category deleted successfully" });
  },
);
