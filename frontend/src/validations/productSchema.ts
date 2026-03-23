import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),

  category: z.string().min(1, "Category is required"),

  image: z.union([
    z
      .instanceof(FileList)
      .refine(
        (files) => files.length === 0 || files[0]?.size <= 5 * 1024 * 1024,
        "Image must be less than 5MB",
      )
      .refine(
        (files) =>
          files.length === 0 ||
          ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            files[0]?.type,
          ),
        "Only jpeg, jpg, png, webp allowed",
      ),
    z.string(),
  ]),

  price: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().min(0.01, "Price must be greater than 0"),
  ) as z.ZodType<number>,
});

export type ProductForm = z.infer<typeof productSchema>;
