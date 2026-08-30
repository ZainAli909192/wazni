"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, FolderTree, Pencil, Plus, Search, Trash2 } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/layout/admin-page-header";
import { AdminEmptyState } from "@/components/admin/shared/admin-empty-state";
import { ConfirmDialog } from "@/components/admin/shared/confirm-dialog";
import { FormAlert } from "@/components/forms/form-alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";
import { deleteCategory, getCategories, type AdminCategory } from "@/lib/api/categories";
import { getErrorMessage } from "@/lib/utils/errors";

const pageSize = 10;

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [level, setLevel] = useState("all");
  const [parentId, setParentId] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState<AdminCategory | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try { setCategories(await getCategories()); }
    catch (loadError) { setError(getErrorMessage(loadError, "Unable to load categories.")); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    let active = true;
    getCategories()
      .then((items) => { if (active) setCategories(items); })
      .catch((loadError) => { if (active) setError(getErrorMessage(loadError, "Unable to load categories.")); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const mainCategories = useMemo(() => categories.filter((category) => !category.parentId), [categories]);
  const orderedCategories = useMemo(() => {
    const mains = categories.filter((category) => !category.parentId);
    const children = categories.filter((category) => category.parentId);
    return mains.flatMap((main) => [main, ...children.filter((child) => child.parentId === main.id)]);
  }, [categories]);

  const filtered = useMemo(() => orderedCategories.filter((category) => {
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || category.name.toLowerCase().includes(query) || category.slug.includes(query) || category.parent?.name.toLowerCase().includes(query);
    const matchesStatus = status === "all" || (status === "active" ? category.isActive : !category.isActive);
    const matchesLevel = level === "all" || (level === "main" ? !category.parentId : Boolean(category.parentId));
    const matchesParent = parentId === "all" || category.parentId === parentId || (parentId === category.id && !category.parentId);
    return matchesSearch && matchesStatus && matchesLevel && matchesParent;
  }), [level, orderedCategories, parentId, search, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const page = Math.min(currentPage, totalPages);
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  const updateFilter = (setter: (value: string) => void, value: string) => { setter(value); setCurrentPage(1); };

  const handleDelete = async () => {
    if (!pendingDelete) return;
    setError("");
    try {
      const response = await deleteCategory(pendingDelete.id);
      setMessage(response.message);
      setPendingDelete(null);
      await load();
    } catch (deleteError) {
      setPendingDelete(null);
      setError(getErrorMessage(deleteError, "Unable to delete category."));
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Categories" description="Manage jewellery main categories and their nested subcategories." action={<Button variant="primary" onClick={() => router.push("/admin/categories/create")}><span className="flex items-center gap-2"><Plus className="h-5 w-5" />Add Category</span></Button>} />
      {message && <FormAlert variant="success" message={message} onClose={() => setMessage("")} />}
      {error && <FormAlert variant="error" message={error} onClose={() => setError("")} />}

      <section className="rounded-xl border border-border bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-3 xl:grid-cols-[minmax(260px,1fr)_180px_180px_220px]">
          <Input type="search" placeholder="Search name, slug or parent..." value={search} onChange={(event) => updateFilter(setSearch, event.target.value)} leftIcon={<Search className="h-5 w-5" />} />
          <select value={level} onChange={(event) => updateFilter(setLevel, event.target.value)} className="h-12 rounded-lg border border-border bg-white px-4 text-sm focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"><option value="all">All Levels</option><option value="main">Main Categories</option><option value="sub">Subcategories</option></select>
          <select value={status} onChange={(event) => updateFilter(setStatus, event.target.value)} className="h-12 rounded-lg border border-border bg-white px-4 text-sm focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"><option value="all">All Statuses</option><option value="active">Active</option><option value="inactive">Inactive</option></select>
          <select value={parentId} onChange={(event) => updateFilter(setParentId, event.target.value)} className="h-12 rounded-lg border border-border bg-white px-4 text-sm focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"><option value="all">All Main Categories</option>{mainCategories.map((main) => <option key={main.id} value={main.id}>{main.name}</option>)}</select>
        </div>
      </section>

      {loading ? <div className="flex min-h-64 items-center justify-center"><Spinner size="lg" label="Loading categories" /></div> : filtered.length === 0 ? <AdminEmptyState type="search" title="No categories found" description="Create a category or change the active filters." /> : (
        <section className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-surface-subtle"><tr>{["Category", "Level / Parent", "Slug", "Subcategories", "Order", "Status", "Actions"].map((heading) => <th key={heading} className={`px-5 py-3 text-xs font-semibold text-muted-foreground ${heading === "Actions" ? "text-right" : "text-left"}`}>{heading}</th>)}</tr></thead>
              <tbody>{visible.map((category) => (
                <tr key={category.id} className="border-t border-border hover:bg-surface-subtle/40">
                  <td className="px-5 py-4"><div className={`flex items-center gap-3 ${category.parentId ? "pl-6" : ""}`}><FolderTree className={`h-5 w-5 ${category.parentId ? "text-muted-foreground" : "text-primary"}`} /><div><p className="text-sm font-semibold text-foreground">{category.name}</p>{category.description && <p className="mt-1 max-w-xs truncate text-xs text-muted-foreground">{category.description}</p>}</div></div></td>
                  <td className="px-5 py-4"><span className="rounded-full bg-surface-subtle px-3 py-1 text-xs font-medium text-primary">{category.parent ? `Sub · ${category.parent.name}` : "Main"}</span></td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{category.slug}</td>
                  <td className="px-5 py-4 text-sm text-foreground">{category.childrenCount}</td>
                  <td className="px-5 py-4 text-sm text-foreground">{category.sortOrder}</td>
                  <td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs font-medium ${category.isActive ? "bg-[var(--success-background)] text-success" : "bg-muted text-muted-foreground"}`}>{category.isActive ? "Active" : "Inactive"}</span></td>
                  <td className="px-5 py-4"><div className="flex justify-end gap-2"><Button variant="outline" size="icon" title="View" onClick={() => router.push(`/admin/categories/${category.id}`)}><Eye className="h-4 w-4" /></Button><Button variant="outline" size="icon" title="Edit" onClick={() => router.push(`/admin/categories/${category.id}/edit`)}><Pencil className="h-4 w-4" /></Button><Button variant="danger" size="icon" title="Delete" onClick={() => setPendingDelete(category)}><Trash2 className="h-4 w-4" /></Button></div></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <Pagination currentPage={page} totalPages={totalPages} totalItems={filtered.length} pageSize={pageSize} onPageChange={setCurrentPage} />
        </section>
      )}

      <ConfirmDialog open={Boolean(pendingDelete)} onClose={() => setPendingDelete(null)} onConfirm={handleDelete} title="Delete Category?" description={pendingDelete ? pendingDelete.childrenCount ? `"${pendingDelete.name}" contains ${pendingDelete.childrenCount} subcategories and cannot be deleted until they are moved or removed.` : `Delete "${pendingDelete.name}" permanently?` : ""} confirmText="Delete Category" variant="danger" />
    </div>
  );
}
