import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import productRouter from "./routes/productRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection failed:", err));

app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript + Express!");
});
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
