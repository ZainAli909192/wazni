"use client";

import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ArrowLeft, ImagePlus, Plus, Save, X } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/layout/admin-page-header";
import { FormAlert } from "@/components/forms/form-alert";
import { SubmitButton } from "@/components/forms/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { getCategories, type AdminCategory } from "@/lib/api/categories";
import { createProduct, getProduct, updateProduct } from "@/lib/api/products";
import { getErrorMessage } from "@/lib/utils/errors";
import { slugify } from "@/lib/utils/slug";
import { productSchema, type ProductFormValues } from "@/lib/validations/product";

const defaults: ProductFormValues = {
  name: "", slug: "", sku: "", categoryId: "", material: "Yellow Gold",
  regularPrice: 0, salePrice: null, quantity: 0, status: "DRAFT", featured: false,
  shortDescription: "", description: "", images: [""],
};

export function ProductEditor({ productId }: { productId?: string }) {
  const editing = Boolean(productId);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [images, setImages] = useState<string[]>([""]);
  const [formError, setFormError] = useState("");
  const { control, register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<ProductFormValues>({ resolver: zodResolver(productSchema), defaultValues: defaults, mode: "onTouched" });
  const name = useWatch({ control, name: "name" });
  const subcategories = useMemo(() => categories.filter((category) => category.parentId && category.isActive), [categories]);

  useEffect(() => {
    let active = true;
    Promise.all([getCategories(), productId ? getProduct(productId) : Promise.resolve(null)])
      .then(([categoryList, product]) => {
        if (!active) return;
        setCategories(categoryList);
        if (product) { reset(product); setImages(product.images); }
      })
      .catch((reason) => active && setFormError(getErrorMessage(reason, "Unable to load product information.")))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [productId, reset]);

  const changeImage = (index: number, value: string) => {
    const next = images.map((image, imageIndex) => imageIndex === index ? value : image);
    setImages(next); setValue("images", next.filter(Boolean), { shouldDirty: true, shouldValidate: true });
  };
  const addImage = () => { if (images.length < 5) setImages((current) => [...current, ""]); };
  const removeImage = (index: number) => {
    const next = images.filter((_, imageIndex) => imageIndex !== index);
    const normalized = next.length ? next : [""];
    setImages(normalized); setValue("images", next.filter(Boolean), { shouldDirty: true, shouldValidate: true });
  };

  const onSubmit = async (values: ProductFormValues) => {
    setFormError("");
    try {
      const payload = { ...values, images: images.map((image) => image.trim()).filter(Boolean) };
      if (editing && productId) await updateProduct(productId, payload); else await createProduct(payload);
      router.push("/admin/products"); router.refresh();
    } catch (reason) { setFormError(getErrorMessage(reason, `Unable to ${editing ? "update" : "create"} product.`)); }
  };

  if (loading) return <div className="flex min-h-[50vh] items-center justify-center"><Spinner size="lg" label="Loading product" /></div>;

  return (
    <div className="space-y-6">
      <AdminPageHeader title={editing ? "Edit Product" : "Add Product"} description="Manage jewellery information, pricing, inventory and product imagery." action={<Button variant="outline" onClick={() => router.push("/admin/products")}><ArrowLeft className="h-4 w-4" />Back</Button>} />
      {formError && <FormAlert variant="error" message={formError} onClose={() => setFormError("")} />}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <section className="rounded-xl border border-border bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-foreground">Product information</h2>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <Input {...register("name")} label="Product Name" placeholder="Diamond Halo Ring" error={errors.name?.message} />
            <div><Input {...register("slug")} label="Slug" placeholder="diamond-halo-ring" error={errors.slug?.message} /><button type="button" onClick={() => setValue("slug", slugify(name), { shouldDirty: true, shouldValidate: true })} className="mt-2 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Generate from name</button></div>
            <Input {...register("sku")} label="SKU" placeholder="WZ-RNG-001" error={errors.sku?.message} />
            <div><label className="mb-2 block text-sm font-semibold text-foreground">Category</label><select {...register("categoryId")} className="h-12 w-full rounded-lg border border-border bg-white px-4 text-sm focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"><option value="">Select subcategory</option>{subcategories.map((category) => <option key={category.id} value={category.id}>{category.parent?.name} / {category.name}</option>)}</select>{errors.categoryId?.message && <p className="mt-1.5 text-sm text-error">{errors.categoryId.message}</p>}</div>
            <Input {...register("material")} label="Material" placeholder="Yellow Gold" error={errors.material?.message} />
            <div><label className="mb-2 block text-sm font-semibold text-foreground">Status</label><select {...register("status")} className="h-12 w-full rounded-lg border border-border bg-white px-4 text-sm focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"><option value="DRAFT">Draft</option><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option></select></div>
            <label className="flex min-h-12 items-center gap-3 rounded-lg border border-border px-4 text-sm font-medium"><input {...register("featured")} type="checkbox" className="h-4 w-4 accent-primary" />Featured product</label>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-foreground">Pricing and inventory</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <Input {...register("regularPrice", { valueAsNumber: true })} type="number" min="1" step="1" label="Regular Price" helperText="AED" error={errors.regularPrice?.message} />
            <Input {...register("salePrice", { setValueAs: (value) => value === "" ? null : Number(value) })} type="number" min="1" step="1" label="Sale Price" helperText="Optional, in AED" error={errors.salePrice?.message} />
            <Input {...register("quantity", { valueAsNumber: true })} type="number" min="0" step="1" label="Stock Quantity" error={errors.quantity?.message} />
          </div>
        </section>

        <section className="rounded-xl border border-border bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-foreground">Description</h2>
          <div className="mt-5 space-y-5"><Textarea {...register("shortDescription")} label="Short Description" rows={3} error={errors.shortDescription?.message} /><Textarea {...register("description")} label="Full Description" rows={7} error={errors.description?.message} /></div>
        </section>

        <section className="rounded-xl border border-border bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-4"><div><h2 className="text-lg font-semibold text-foreground">Product images</h2><p className="mt-1 text-sm text-muted-foreground">Add up to five public image paths or HTTPS URLs. The first image is used in product listings.</p></div><Button type="button" variant="outline" size="sm" onClick={addImage} disabled={images.length >= 5}><Plus className="h-4 w-4" />Add Image</Button></div>
          <div className="mt-5 space-y-4">{images.map((image, index) => <div key={index} className="grid items-center gap-3 sm:grid-cols-[72px_1fr_44px]"><div className="flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-subtle">{image ? <div role="img" aria-label={`Product preview ${index + 1}`} className="h-full w-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${JSON.stringify(image).slice(1, -1)})` }} /> : <ImagePlus className="h-6 w-6 text-muted-foreground" />}</div><Input value={image} onChange={(event) => changeImage(index, event.target.value)} aria-label={`Image ${index + 1} path`} placeholder="/images/products/ring-1.png" /><Button type="button" variant="danger" size="icon" aria-label={`Remove image ${index + 1}`} onClick={() => removeImage(index)}><X className="h-4 w-4" /></Button></div>)}</div>
          {errors.images?.message && <p className="mt-2 text-sm text-error">{errors.images.message}</p>}
        </section>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>Cancel</Button><SubmitButton loading={isSubmitting} loadingText="Saving..." fullWidth={false}><Save className="h-4 w-4" />{editing ? "Update Product" : "Save Product"}</SubmitButton></div>
      </form>
    </div>
  );
}
