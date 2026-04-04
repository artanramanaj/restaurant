import { z } from "zod";

const orderItemSchema = z.object({
  product: z.string().min(1, "Product id is required"),
  name: z.string().min(1, "Product name is required"),
  image: z.string().min(1, "Product image is required"),
  price: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().min(0.01, "Price must be greater than 0"),
  ) as z.ZodType<number>,
  quantity: z.preprocess(
    (val) => parseInt(val as string),
    z.number().min(1, "Quantity must be at least 1"),
  ) as z.ZodType<number>,
});

const deliveryAddressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  phone: z.string().min(6, "Phone is required"),
});

export const orderSchema = z
  .object({
    items: z.array(orderItemSchema).min(1, "Order must have at least one item"),
    orderType: z.enum(["delivery", "takeaway"], {
      errorMap: () => ({ message: "Order type must be delivery or takeaway" }),
    }),
    deliveryAddress: deliveryAddressSchema.optional(),
  })
  .refine(
    (data) => {
      if (data.orderType === "delivery" && !data.deliveryAddress) {
        return false;
      }
      return true;
    },
    {
      message: "Delivery address is required for delivery orders",
      path: ["deliveryAddress"],
    },
  );
