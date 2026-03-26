import mongoose from "mongoose";
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
});

const Category = model("Category", categorySchema);
export default Category;
