import { ProductEditor } from "@/components/admin/products/product-editor";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  return <ProductEditor productId={(await params).id} />;
}
