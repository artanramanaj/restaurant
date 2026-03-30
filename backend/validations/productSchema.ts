import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),

  category: z.string().min(1, "Category is required"),

  price: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().min(0.01, "Price must be greater than 0"),
  ) as z.ZodType<number>,
});
