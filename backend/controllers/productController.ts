import Product from "../models/productModel.js";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { customError } from "../middleware/errorHandler.js";
import asyncHandler from "express-async-handler";

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 6;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;
  const category = (req.query.category as string) || "all";
  const search = (req.query.search as string) || "";

  const query: Record<string, any> = {};

  if (category !== "all") {
    query.category = category;
  }

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  const [products, total] = await Promise.all([
    Product.find(query).limit(limit).skip(skip).populate("category"),
    Product.countDocuments(query),
  ]);

  res.status(StatusCodes.OK).json({
    products,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  });
});

export const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findById(id).exec();
  if (!product) {
    throw new customError(
      `product with id ${id} does not exist`,
      StatusCodes.BAD_REQUEST,
    );
  }
  res.status(StatusCodes.OK).json(product);
});

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await Product.create(req.body);

    if (!product) {
      throw new customError("Product creation failed", StatusCodes.BAD_REQUEST);
    }

    res.status(StatusCodes.CREATED).json(product);
  },
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProduct) {
      throw new customError(
        `Product with id ${id} not found`,
        StatusCodes.NOT_FOUND,
      );
    }

    res.status(StatusCodes.OK).json(updatedProduct);
  },
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedProduct = await Product.findOneAndDelete({ _id: id });

    if (!deletedProduct) {
      throw new customError(
        `Product with id ${id} not found`,
        StatusCodes.NOT_FOUND,
      );
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Product deleted successfully" });
  },
);

export const getTotalProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const total = await Product.countDocuments({});
    res.status(StatusCodes.OK).json({ total });
  },
);
