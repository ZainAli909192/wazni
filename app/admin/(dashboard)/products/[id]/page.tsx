"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ImageIcon, Pencil } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/layout/admin-page-header";
import { FormAlert } from "@/components/forms/form-alert";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { getProduct, type AdminProduct } from "@/lib/api/products";
import { getErrorMessage } from "@/lib/utils/errors";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<AdminProduct | null>(null);
  const [error, setError] = useState("");
  useEffect(() => { let active = true; getProduct(id).then((value) => active && setProduct(value)).catch((reason) => active && setError(getErrorMessage(reason, "Unable to load product."))); return () => { active = false; }; }, [id]);
  if (!product && !error) return <div className="flex min-h-[50vh] items-center justify-center"><Spinner size="lg" label="Loading product" /></div>;
  return <div className="space-y-6">
    <AdminPageHeader title={product?.name ?? "Product"} description="View complete catalogue, pricing and inventory information." action={<div className="flex gap-3"><Button variant="outline" onClick={() => router.push("/admin/products")}><ArrowLeft className="h-4 w-4" />Back</Button>{product && <Button onClick={() => router.push(`/admin/products/${product.id}/edit`)}><Pencil className="h-4 w-4" />Edit</Button>}</div>} />
    {error && <FormAlert variant="error" message={error} />}
    {product && <>
      <section className="grid gap-6 rounded-xl border border-border bg-white p-5 shadow-sm lg:grid-cols-[minmax(300px,420px)_1fr] lg:p-6"><div><div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-subtle">{product.images[0] ? <div role="img" aria-label={product.name} className="h-full w-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${JSON.stringify(product.images[0]).slice(1, -1)})` }} /> : <ImageIcon className="h-10 w-10 text-muted-foreground" />}</div><div className="mt-3 grid grid-cols-5 gap-2">{product.images.map((image, index) => <div key={image} role="img" aria-label={`${product.name} image ${index + 1}`} className="aspect-square rounded-lg border border-border bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${JSON.stringify(image).slice(1, -1)})` }} />)}</div></div><div><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{product.category.parent?.name} / {product.category.name}</p><h2 className="mt-3 text-2xl font-semibold text-foreground">{product.name}</h2><p className="mt-2 text-sm text-muted-foreground">SKU: {product.sku}</p><p className="mt-6 text-2xl font-semibold text-primary">AED {(product.salePrice ?? product.regularPrice).toLocaleString()}</p>{product.salePrice && <p className="mt-1 text-sm text-muted-foreground line-through">AED {product.regularPrice.toLocaleString()}</p>}<p className="mt-6 leading-7 text-muted-foreground">{product.shortDescription}</p><dl className="mt-6 grid sm:grid-cols-2">{[["Material", product.material], ["Stock", String(product.quantity)], ["Status", product.status], ["Featured", product.featured ? "Yes" : "No"], ["Slug", product.slug], ["Updated", new Date(product.updatedAt).toLocaleString()]].map(([label,value]) => <div key={label} className="border-b border-border py-4 sm:odd:pr-5 sm:even:pl-5"><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt><dd className="mt-2 text-sm font-medium">{value}</dd></div>)}</dl></div></section>
      <section className="rounded-xl border border-border bg-white p-6 shadow-sm"><h2 className="text-lg font-semibold">Full description</h2><p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted-foreground">{product.description}</p></section>
    </>}
  </div>;
}
