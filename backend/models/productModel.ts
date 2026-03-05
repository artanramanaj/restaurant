import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    image: String,
    price: Number,
  },
  { timestamps: true },
);

const Product = model("Product", productSchema);
export default Product;
