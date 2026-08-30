import { z } from "zod";

export const adminProfileSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must contain at least 2 characters.").max(100),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(7, "Enter a valid phone number.").max(30),
  avatar: z.string().max(3_000_000, "Profile image is too large.").optional().default(""),
});

export type AdminProfileFormValues = z.infer<typeof adminProfileSchema>;
