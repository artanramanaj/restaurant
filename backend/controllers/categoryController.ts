import { Request, Response } from "express";
import Category from "../models/categoryModel.js";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import { customError } from "../middleware/errorHandler.js";

export const getCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const { limit, page } = req.query;

    if (!limit && !page) {
      const categories = await Category.find({});
      const total = await Category.countDocuments();

      return res.status(StatusCodes.OK).json({
        categories,
        pagination: {
          total,
          page: 1,
          pages: 1,
        },
      });
    }

    const parsedLimit = Number(limit) || 6;
    const parsedPage = Number(page) || 1;
    const skip = (parsedPage - 1) * parsedLimit;

    const categories = await Category.find({}).skip(skip).limit(parsedLimit);

    const total = await Category.countDocuments();

    res.status(StatusCodes.OK).json({
      categories,
      pagination: {
        total,
        page: parsedPage,
        pages: Math.ceil(total / parsedLimit),
      },
    });
  },
);

export const getCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    throw new customError("Category not found", StatusCodes.NOT_FOUND);
  }

  res.status(StatusCodes.OK).json({ category });
});
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

    const existing = await Category.findOne({ name });

    if (existing) {
      let { name } = existing;
      throw new customError(
        `Category "${name}" exist`,
        StatusCodes.BAD_REQUEST,
      );
    }

    const category = await Category.create(categoryData);
    res.status(StatusCodes.CREATED).json(category);
  },
);

export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCategory) {
      throw new customError("Category not found", StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json({ category: updatedCategory });
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

export const getTotalCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const total = await Category.countDocuments({});
    res.status(StatusCodes.OK).json({ total });
  },
);
