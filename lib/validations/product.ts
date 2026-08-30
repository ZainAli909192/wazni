import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(2, "Product name must contain at least 2 characters.").max(120),
  slug: z.string().trim().min(2, "Slug is required.").max(140).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only."),
  sku: z.string().trim().min(2, "SKU is required.").max(60).regex(/^[A-Za-z0-9-]+$/, "Use letters, numbers and hyphens only."),
  categoryId: z.string().trim().min(1, "Select a product category."),
  material: z.string().trim().min(2, "Material is required.").max(80),
  regularPrice: z.number().int().positive("Price must be greater than zero."),
  salePrice: z.number().int().positive("Sale price must be greater than zero.").nullable(),
  quantity: z.number().int().min(0, "Quantity cannot be negative."),
  status: z.enum(["DRAFT", "ACTIVE", "INACTIVE"]),
  featured: z.boolean(),
  shortDescription: z.string().trim().min(10, "Short description must contain at least 10 characters.").max(240),
  description: z.string().trim().min(20, "Description must contain at least 20 characters.").max(5000),
  images: z.array(z.string().trim().min(1)).min(1, "Add at least one image.").max(5, "Add no more than five images."),
}).superRefine((data, context) => {
  if (data.salePrice !== null && data.salePrice >= data.regularPrice) {
    context.addIssue({ code: "custom", path: ["salePrice"], message: "Sale price must be lower than the regular price." });
  }
});

export type ProductFormValues = z.infer<typeof productSchema>;
