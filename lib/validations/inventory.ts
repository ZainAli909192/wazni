import { z } from "zod";

export const inventoryUpdateSchema = z.object({
  ids: z.array(z.string().min(1)).min(1, "Select at least one product.").max(100),
  action: z.enum(["add", "remove", "set", "threshold"]),
  quantity: z.number().int().min(0, "Quantity cannot be negative."),
  reason: z.string().trim().max(80).optional().default(""),
  notes: z.string().trim().max(500).optional().default(""),
}).superRefine((data, context) => {
  if ((data.action === "add" || data.action === "remove") && data.quantity === 0) {
    context.addIssue({ code: "custom", path: ["quantity"], message: "Quantity must be greater than zero." });
  }
});

export type InventoryUpdateValues = z.infer<typeof inventoryUpdateSchema>;
