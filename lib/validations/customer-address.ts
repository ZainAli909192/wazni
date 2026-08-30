import { z } from "zod";

export const customerAddressSchema = z.object({
  label: z.enum(["Home", "Office"]), firstName: z.string().trim().min(1), lastName: z.string().trim().min(1), phone: z.string().trim().min(7),
  emirate: z.string().trim().min(1), area: z.string().trim().min(1), street: z.string().trim().min(1), unit: z.string().trim().optional().default(""), landmark: z.string().trim().optional().default(""), isDefault: z.boolean().default(false),
});
