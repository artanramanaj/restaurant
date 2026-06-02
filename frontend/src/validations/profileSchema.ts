import { z } from "zod";

export const profileSchema = z
  .object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    email: z.string().email(),
    password: z.string(),
    passwordConfirmation: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.password && !data.passwordConfirmation) return;

    if (data.password.length < 8) {
      ctx.addIssue({
        code: "custom",
        message: "Password must be at least 8 characters",
        path: ["password"],
      });
    }

    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
      });
    }
  });

export type ProfileForm = z.infer<typeof profileSchema>;
