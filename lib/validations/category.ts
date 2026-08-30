import { z } from "zod";
export const categorySchema = z.object({
  name: z.string().trim().min(2, "Category name must contain at least 2 characters.").max(80),
  slug: z.string().trim().min(2, "Slug is required.").max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only."),
  parentId: z.string().trim().nullable(),
  description: z.string().trim().max(500),
  isActive: z.boolean(),
  sortOrder: z.number().int().min(0).max(9999),
});
export type CategoryFormValues = z.infer<typeof categorySchema>;
