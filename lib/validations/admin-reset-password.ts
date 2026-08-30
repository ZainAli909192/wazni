import { z } from "zod";

export const adminResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(12, "Password must contain at least 12 characters.")
      .regex(/[A-Z]/, "Password must include an uppercase letter.")
      .regex(/[a-z]/, "Password must include a lowercase letter.")
      .regex(/[0-9]/, "Password must include a number.")
      .regex(/[^A-Za-z0-9]/, "Password must include a special character."),

    passwordConfirmation: z
      .string()
      .min(1, "Please confirm your password."),
  })
  .refine(
    (data) => data.password === data.passwordConfirmation,
    {
      message: "Passwords do not match.",
      path: ["passwordConfirmation"],
    }
  );

export type AdminResetPasswordFormValues = z.infer<
  typeof adminResetPasswordSchema
>;
