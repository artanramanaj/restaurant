import mongoose from "mongoose";
const { Schema, model } = mongoose;

const orderItemSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    items: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    paymentMethod: {
      type: String,
      default: "cash",
      enum: ["cash"],
    },
    status: {
      type: String,
      enum: ["confirmed", "pending", "delivered", "taken", "cancelled"],
      default: "pending",
    },
    orderType: {
      type: String,
      enum: ["delivery", "takeaway"],
      default: "delivery",
      required: true,
    },
    deliveryAddress: {
      street: { type: String },
      city: { type: String },
      phone: { type: String },
    },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

const Order = model("Order", orderSchema);
export default Order;
