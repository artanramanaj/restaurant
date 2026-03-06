import Product from "../models/productModel.js";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { customError } from "../middleware/errorHandler.js";
import asyncHandler from "express-async-handler";

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json(products);
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
