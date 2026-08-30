"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/layout/admin-page-header";
import { FormAlert } from "@/components/forms/form-alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { SubmitButton } from "@/components/forms/submit-button";
import { createCategory, getCategories, getCategory, updateCategory, type AdminCategory } from "@/lib/api/categories";
import { categorySchema, type CategoryFormValues } from "@/lib/validations/category";
import { getErrorMessage } from "@/lib/utils/errors";
import { slugify } from "@/lib/utils/slug";

export function CategoryEditor({ categoryId }: { categoryId?: string }) {
  const router = useRouter();
  const editing = Boolean(categoryId);
  const [loading, setLoading] = useState(editing);
  const [parents, setParents] = useState<AdminCategory[]>([]);
  const [level, setLevel] = useState<"main" | "sub">("main");
  const [childrenCount, setChildrenCount] = useState(0);
  const [formError, setFormError] = useState("");

  const { control, register, handleSubmit, reset, setError, setValue, formState: { errors, isSubmitting } } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", slug: "", parentId: null, description: "", isActive: true, sortOrder: 0 },
    mode: "onTouched",
  });

  const name = useWatch({ control, name: "name" });
  const availableParents = useMemo(() => parents.filter((item) => item.id !== categoryId), [categoryId, parents]);

  useEffect(() => {
    let active = true;
    Promise.all([getCategories(), categoryId ? getCategory(categoryId) : Promise.resolve(null)])
      .then(([allCategories, category]) => {
        if (!active) return;
        setParents(allCategories.filter((item) => !item.parentId));
        if (category) {
          reset({
            name: category.name,
            slug: category.slug,
            parentId: category.parentId,
            description: category.description ?? "",
            isActive: category.isActive,
            sortOrder: category.sortOrder,
          });
          setLevel(category.parentId ? "sub" : "main");
          setChildrenCount(category.childrenCount);
        }
      })
      .catch((error) => active && setFormError(getErrorMessage(error, "Unable to load category information.")))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [categoryId, reset]);

  const changeLevel = (next: "main" | "sub") => {
    setLevel(next);
    if (next === "main") setValue("parentId", null, { shouldValidate: true });
  };

  const onSubmit = async (values: CategoryFormValues) => {
    setFormError("");
    if (level === "sub" && !values.parentId) {
      setError("parentId", { type: "manual", message: "Select a main category." });
      return;
    }
    try {
      const payload = { ...values, parentId: level === "main" ? null : values.parentId };
      if (editing && categoryId) await updateCategory(categoryId, payload);
      else await createCategory(payload);
      router.push("/admin/categories");
      router.refresh();
    } catch (error) {
      setFormError(getErrorMessage(error, `Unable to ${editing ? "update" : "create"} category.`));
    }
  };

  if (loading) return <div className="flex min-h-[50vh] items-center justify-center"><Spinner size="lg" label="Loading category" /></div>;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={editing ? "Edit Category" : "Add Category"}
        description="Manage a jewellery main category or place a subcategory beneath it."
        action={<Button variant="outline" onClick={() => router.push("/admin/categories")}><span className="flex items-center gap-2"><ArrowLeft className="h-4 w-4" />Back</span></Button>}
      />
      {formError && <FormAlert variant="error" message={formError} onClose={() => setFormError("")} />}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <section className="rounded-xl border border-border bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <p className="text-sm font-semibold text-foreground">Category Level</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={() => changeLevel("main")} className={`rounded-xl border p-4 text-left ${level === "main" ? "border-primary bg-primary/5" : "border-border"}`}>
                <span className="block text-sm font-semibold">Main Category</span><span className="mt-1 block text-xs text-muted-foreground">Top-level navigation group.</span>
              </button>
              <button type="button" disabled={childrenCount > 0} onClick={() => changeLevel("sub")} className={`rounded-xl border p-4 text-left disabled:cursor-not-allowed disabled:opacity-50 ${level === "sub" ? "border-primary bg-primary/5" : "border-border"}`}>
                <span className="block text-sm font-semibold">Subcategory</span><span className="mt-1 block text-xs text-muted-foreground">Nested beneath one main category.</span>
              </button>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <Input {...register("name")} label="Category Name" placeholder="Example: Rings" error={errors.name?.message} disabled={isSubmitting} />
            <div>
              <Input {...register("slug")} label="Slug" placeholder="rings" error={errors.slug?.message} disabled={isSubmitting} />
              <button type="button" onClick={() => setValue("slug", slugify(name || ""), { shouldValidate: true, shouldDirty: true })} className="mt-2 text-sm font-medium text-primary hover:underline">Generate from category name</button>
            </div>

            {level === "sub" && (
              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">Main Category</label>
                <select {...register("parentId", { setValueAs: (value) => value || null })} className="h-12 w-full rounded-lg border border-border bg-white px-4 text-sm focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20">
                  <option value="">Select main category</option>
                  {availableParents.map((parent) => <option key={parent.id} value={parent.id}>{parent.name}</option>)}
                </select>
                {errors.parentId?.message && <p className="mt-1.5 text-sm text-error">{errors.parentId.message}</p>}
              </div>
            )}

            <Input {...register("sortOrder", { valueAsNumber: true })} type="number" min={0} label="Sort Order" error={errors.sortOrder?.message} />
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Status</label>
              <select {...register("isActive", { setValueAs: (value) => value === "true" })} className="h-12 w-full rounded-lg border border-border bg-white px-4 text-sm focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20">
                <option value="true">Active</option><option value="false">Inactive</option>
              </select>
            </div>
            <div className="lg:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-foreground">Description</label>
              <textarea {...register("description")} rows={4} placeholder="Describe this jewellery category..." className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20" />
              {errors.description?.message && <p className="mt-1.5 text-sm text-error">{errors.description.message}</p>}
            </div>
          </div>
        </section>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/categories")}>Cancel</Button>
          <SubmitButton loading={isSubmitting} loadingText="Saving..." fullWidth={false}><span className="flex items-center gap-2"><Save className="h-4 w-4" />{editing ? "Update Category" : "Save Category"}</span></SubmitButton>
        </div>
      </form>
    </div>
  );
}
