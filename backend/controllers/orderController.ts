import Order from "../models/orderModel.js";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { customError } from "../middleware/errorHandler.js";
import asyncHandler from "express-async-handler";

export const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 6;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;

  const total = await Order.countDocuments();

  const orders = await Order.find({})
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalPages = Math.ceil(total / limit);

  res.status(StatusCodes.OK).json({
    orders,
    pagination: {
      total,
      pages: totalPages,
      page,
    },
  });
});

export const getOrder = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const order = await Order.findById(id).exec();

  if (!order) {
    throw new customError(
      `order with id ${id} does not exist`,
      StatusCodes.BAD_REQUEST,
    );
  }

  res.status(StatusCodes.OK).json(order);
});

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { items, deliveryAddress, orderType } = req.body;
  if (!items || items.length === 0) {
    throw new customError("No order items", StatusCodes.BAD_REQUEST);
  }

  if (orderType === "delivery" && !deliveryAddress) {
    throw new customError(
      "Delivery address is required for delivery orders",
      StatusCodes.BAD_REQUEST,
    );
  }

  const totalPrice = items.reduce(
    (acc: number, item: { price: number; quantity: number }) =>
      acc + item.price * item.quantity,
    0,
  );

  const order = await Order.create({
    user: req.user?.id || null,
    items,
    totalPrice,
    orderType,
    deliveryAddress: orderType === "delivery" ? deliveryAddress : null,
  });

  res.status(StatusCodes.CREATED).json({ message: "Order created", order });
});

export const updateOrderStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "pending",
      "confirmed",
      "preparing",
      "delivered",
      "taken",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      throw new customError("Invalid status", StatusCodes.BAD_REQUEST);
    }

    const order = await Order.findById(id);

    if (!order) {
      throw new customError("Order not found", StatusCodes.NOT_FOUND);
    }

    if (order.status === "delivered" || order.status === "taken") {
      throw new customError(
        "Cannot update a completed order",
        StatusCodes.BAD_REQUEST,
      );
    }

    if (order.status === "cancelled") {
      throw new customError(
        "Cannot update a cancelled order",
        StatusCodes.BAD_REQUEST,
      );
    }

    if (status === "delivered" && order.orderType !== "delivery") {
      throw new customError(
        "Cannot mark a takeaway order as delivered",
        StatusCodes.BAD_REQUEST,
      );
    }

    if (status === "taken" && order.orderType !== "takeaway") {
      throw new customError(
        "Cannot mark a delivery order as taken",
        StatusCodes.BAD_REQUEST,
      );
    }

    order.status = status;
    if (status === "delivered" || status === "taken") {
      order.completedAt = new Date();
    }

    await order.save();

    res
      .status(StatusCodes.OK)
      .json({ message: `Order status updated to ${status}`, order });
  },
);

export const deleteOrder = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await Order.findByIdAndDelete(id);
  if (!order) {
    throw new customError(
      `order with id ${id} does not exist`,
      StatusCodes.BAD_REQUEST,
    );
  }
  res.status(StatusCodes.OK).json({ message: "Order deleted successfully" });
});

export const getTotalOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const total = await Order.countDocuments({});
    res.status(StatusCodes.OK).json({ total });
  },
);
