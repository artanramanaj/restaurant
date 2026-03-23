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
    Product.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate("category"),
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
    const { name, category, price } = req.body;

    if (!req.file) {
      throw new customError("Image is required", StatusCodes.BAD_REQUEST);
    }

    const image = req.file.filename; // ← e.g. "1741234567890-hamburger.jpg"

    const product = await Product.create({
      name,
      category,
      price,
      image,
    });

    res.status(StatusCodes.CREATED).json(product);
  },
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      throw new customError(
        `Product with id ${id} not found`,
        StatusCodes.NOT_FOUND,
      );
    }

    product.name = req.body.name || product.name;
    product.category = req.body.category || product.category;
    product.price = req.body.price || product.price;
    product.image = req.file ? req.file.filename : req.body.image;

    const updatedProduct = await product.save();

    res.status(StatusCodes.OK).json({
      message: "Product Updated",
      product: updatedProduct,
    });
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
