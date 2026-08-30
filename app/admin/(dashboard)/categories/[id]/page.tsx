"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FolderTree, Pencil } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/layout/admin-page-header";
import { FormAlert } from "@/components/forms/form-alert";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { getCategory, type AdminCategory } from "@/lib/api/categories";
import { getErrorMessage } from "@/lib/utils/errors";

export default function CategoryDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [category, setCategory] = useState<AdminCategory | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getCategory(id)
      .then((value) => active && setCategory(value))
      .catch((reason) => active && setError(getErrorMessage(reason, "Unable to load category.")));
    return () => { active = false; };
  }, [id]);

  if (!category && !error) {
    return <div className="flex min-h-[50vh] items-center justify-center"><Spinner size="lg" label="Loading category" /></div>;
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={category?.name ?? "Category"}
        description="View category hierarchy, publishing status and catalogue settings."
        action={
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => router.push("/admin/categories")}><ArrowLeft className="h-4 w-4" />Back</Button>
            {category && <Button onClick={() => router.push(`/admin/categories/${category.id}/edit`)}><Pencil className="h-4 w-4" />Edit</Button>}
          </div>
        }
      />
      {error && <FormAlert variant="error" message={error} />}
      {category && (
        <section className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
          <div className="flex items-center gap-4 border-b border-border p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><FolderTree className="h-6 w-6" /></div>
            <div><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{category.parent ? "Subcategory" : "Main category"}</p><h2 className="mt-1 text-xl font-semibold text-foreground">{category.name}</h2></div>
          </div>
          <dl className="grid md:grid-cols-2">
            {[
              ["Parent category", category.parent?.name ?? "None — top level"],
              ["Slug", category.slug],
              ["Status", category.isActive ? "Active" : "Inactive"],
              ["Sort order", String(category.sortOrder)],
              ["Subcategories", String(category.childrenCount)],
              ["Last updated", new Date(category.updatedAt).toLocaleString()],
            ].map(([label, value]) => (
              <div key={label} className="border-b border-border p-5 md:odd:border-r"><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt><dd className="mt-2 text-sm font-medium text-foreground">{value}</dd></div>
            ))}
          </dl>
          <div className="p-6"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</p><p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{category.description || "No description has been added."}</p></div>
        </section>
      )}
    </div>
  );
}
