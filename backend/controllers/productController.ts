import Product from "../models/productModel.js";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { customError } from "../middleware/errorHandler.js";
export const createProduct = async (req: Request, res: Response) => {
  const productData = {
    name: "hamburger beef",
    category: "69a99c1dafa70c06051f5223",
    price: 5,
    image: "hamburger.jpg",
  };
  try {
    const product = await Product.create(productData);
    res.status(StatusCodes.CREATED).json(product);
  } catch (error) {
    throw new customError("creation failed", StatusCodes.BAD_REQUEST);
  }
};
