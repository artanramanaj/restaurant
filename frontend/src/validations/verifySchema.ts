import { z } from "zod";

export const verifySchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});
export type VerifyForm = z.infer<typeof verifySchema>;
