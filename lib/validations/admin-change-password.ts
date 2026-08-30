import { z } from "zod";
export const adminChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required."),
  newPassword: z.string()
    .min(12, "New password must contain at least 12 characters.")
    .regex(/[A-Z]/, "New password must include an uppercase letter.")
    .regex(/[a-z]/, "New password must include a lowercase letter.")
    .regex(/[0-9]/, "New password must include a number.")
    .regex(/[^A-Za-z0-9]/, "New password must include a special character."),
  confirmPassword: z.string().min(1, "Please confirm your new password."),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});
export type AdminChangePasswordFormValues = z.infer<typeof adminChangePasswordSchema>;
