import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRouter from "./routes/productRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection failed:", err));

app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript + Express!");
});
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
