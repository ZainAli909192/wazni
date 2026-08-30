"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, ImageIcon, Pencil, Plus, Search, Trash2 } from "lucide-react";

import { AdminPageHeader } from "@/components/admin/layout/admin-page-header";
import { AdminEmptyState } from "@/components/admin/shared/admin-empty-state";
import { ConfirmDialog } from "@/components/admin/shared/confirm-dialog";
import { FormAlert } from "@/components/forms/form-alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";
import { deleteProduct, getProducts, type AdminProduct } from "@/lib/api/products";
import { getErrorMessage } from "@/lib/utils/errors";

const pageSize = 8;
const lowStockThreshold = 2;
const selectClass = "h-12 rounded-lg border border-border bg-white px-4 text-sm focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20";
const labelStatus = (status: AdminProduct["status"]) => status.charAt(0) + status.slice(1).toLowerCase();

function ProductThumb({ product, size = "h-14 w-14" }: { product: AdminProduct; size?: string }) {
  const image = product.images[0];
  return <div className={`${size} shrink-0 overflow-hidden rounded-lg border border-border bg-surface-subtle`}>{image ? <div role="img" aria-label={product.name} className="h-full w-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${JSON.stringify(image).slice(1, -1)})` }} /> : <div className="flex h-full w-full items-center justify-center"><ImageIcon className="h-5 w-5 text-muted-foreground" /></div>}</div>;
}

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [mainCategory, setMainCategory] = useState("all");
  const [categoryId, setCategoryId] = useState("all");
  const [stock, setStock] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState<AdminProduct | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    try { setProducts(await getProducts()); }
    catch (reason) { setError(getErrorMessage(reason, "Unable to load products.")); }
    finally { setLoading(false); }
  };
  useEffect(() => { let active = true; getProducts().then((items) => active && setProducts(items)).catch((reason) => active && setError(getErrorMessage(reason, "Unable to load products."))).finally(() => active && setLoading(false)); return () => { active = false; }; }, []);

  const mainCategories = useMemo(() => [...new Map(products.map((product) => [product.category.parent?.id ?? product.category.id, product.category.parent?.name ?? product.category.name])).entries()], [products]);
  const categories = useMemo(() => [...new Map(products.filter((product) => mainCategory === "all" || (product.category.parent?.id ?? product.category.id) === mainCategory).map((product) => [product.category.id, product.category.name])).entries()], [mainCategory, products]);
  const filtered = useMemo(() => products.filter((product) => {
    const query = search.trim().toLowerCase();
    const price = product.salePrice ?? product.regularPrice;
    const matchesSearch = !query || [product.name, product.sku, product.slug, product.material, product.category.name].some((value) => value.toLowerCase().includes(query)) || String(price).includes(query);
    const matchesMain = mainCategory === "all" || (product.category.parent?.id ?? product.category.id) === mainCategory;
    const matchesCategory = categoryId === "all" || product.category.id === categoryId;
    const matchesStatus = status === "all" || product.status === status;
    const matchesStock = stock === "all" || (stock === "in" && product.quantity > lowStockThreshold) || (stock === "low" && product.quantity > 0 && product.quantity <= lowStockThreshold) || (stock === "out" && product.quantity === 0);
    return matchesSearch && matchesMain && matchesCategory && matchesStatus && matchesStock;
  }), [categoryId, mainCategory, products, search, status, stock]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const changeFilter = (setter: (value: string) => void, value: string) => { setter(value); setPage(1); };

  const handleDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true); setError("");
    try { const result = await deleteProduct(pendingDelete.id); setMessage(result.message); setPendingDelete(null); await load(); }
    catch (reason) { setPendingDelete(null); setError(getErrorMessage(reason, "Unable to delete product.")); }
    finally { setDeleting(false); }
  };
  const stockBadge = (quantity: number) => quantity === 0 ? <span className="rounded-full bg-[var(--error-background)] px-3 py-1 text-xs font-medium text-error">Out of stock</span> : quantity <= lowStockThreshold ? <span className="rounded-full bg-[var(--warning-background)] px-3 py-1 text-xs font-medium text-warning">{quantity} left</span> : <span className="rounded-full bg-[var(--success-background)] px-3 py-1 text-xs font-medium text-success">{quantity} in stock</span>;

  return <div className="space-y-6">
    <AdminPageHeader title="Products" description="Manage Wazni jewellery catalogue, pricing, stock and publishing status." action={<Button onClick={() => router.push("/admin/products/create")}><Plus className="h-5 w-5" />Add Product</Button>} />
    {message && <FormAlert variant="success" message={message} onClose={() => setMessage("")} />}{error && <FormAlert variant="error" message={error} onClose={() => setError("")} />}
    <section className="rounded-xl border border-border bg-white p-4 shadow-sm sm:p-5"><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(240px,1fr)_180px_190px_160px_160px]">
      <Input type="search" placeholder="Search name, SKU, material..." value={search} onChange={(event) => changeFilter(setSearch, event.target.value)} leftIcon={<Search className="h-5 w-5" />} />
      <select value={mainCategory} onChange={(event) => { changeFilter(setMainCategory, event.target.value); setCategoryId("all"); }} className={selectClass}><option value="all">All Main Categories</option>{mainCategories.map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select>
      <select value={categoryId} onChange={(event) => changeFilter(setCategoryId, event.target.value)} className={selectClass}><option value="all">All Subcategories</option>{categories.map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select>
      <select value={stock} onChange={(event) => changeFilter(setStock, event.target.value)} className={selectClass}><option value="all">All Stock</option><option value="in">In Stock</option><option value="low">Low Stock</option><option value="out">Out of Stock</option></select>
      <select value={status} onChange={(event) => changeFilter(setStatus, event.target.value)} className={selectClass}><option value="all">All Statuses</option><option value="ACTIVE">Active</option><option value="DRAFT">Draft</option><option value="INACTIVE">Inactive</option></select>
    </div></section>
    {loading ? <div className="flex min-h-64 items-center justify-center"><Spinner size="lg" label="Loading products" /></div> : !filtered.length ? <AdminEmptyState type="search" title="No products found" description="Add a product or change the active filters." /> : <>
      <section className="hidden overflow-hidden rounded-xl border border-border bg-white shadow-sm md:block"><div className="overflow-x-auto"><table className="w-full min-w-[1080px]"><thead className="bg-surface-subtle"><tr>{["Image", "Product", "Category", "Price", "Stock", "Status", "Actions"].map((heading) => <th key={heading} className={`px-5 py-3 text-xs font-semibold text-muted-foreground ${heading === "Actions" ? "text-right" : "text-left"}`}>{heading}</th>)}</tr></thead><tbody>{visible.map((product) => <tr key={product.id} className="border-t border-border hover:bg-surface-subtle/40"><td className="px-5 py-3"><ProductThumb product={product} /></td><td className="px-5 py-4"><p className="text-sm font-semibold text-foreground">{product.name}</p><p className="mt-1 text-xs text-muted-foreground">{product.sku} · {product.material}</p></td><td className="px-5 py-4 text-sm"><p>{product.category.name}</p><p className="mt-1 text-xs text-muted-foreground">{product.category.parent?.name}</p></td><td className="px-5 py-4 text-sm font-semibold">AED {(product.salePrice ?? product.regularPrice).toLocaleString()}{product.salePrice && <span className="ml-2 text-xs font-normal text-muted-foreground line-through">{product.regularPrice.toLocaleString()}</span>}</td><td className="px-5 py-4">{stockBadge(product.quantity)}</td><td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs font-medium ${product.status === "ACTIVE" ? "bg-[var(--success-background)] text-success" : product.status === "DRAFT" ? "bg-[var(--warning-background)] text-warning" : "bg-muted text-muted-foreground"}`}>{labelStatus(product.status)}</span></td><td className="px-5 py-4"><div className="flex justify-end gap-2"><Button variant="outline" size="icon" aria-label={`View ${product.name}`} onClick={() => router.push(`/admin/products/${product.id}`)}><Eye className="h-4 w-4" /></Button><Button variant="outline" size="icon" aria-label={`Edit ${product.name}`} onClick={() => router.push(`/admin/products/${product.id}/edit`)}><Pencil className="h-4 w-4" /></Button><Button variant="danger" size="icon" aria-label={`Delete ${product.name}`} onClick={() => setPendingDelete(product)}><Trash2 className="h-4 w-4" /></Button></div></td></tr>)}</tbody></table></div><Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filtered.length} pageSize={pageSize} onPageChange={setPage} /></section>
      <div className="space-y-3 md:hidden">{visible.map((product) => <article key={product.id} className="rounded-xl border border-border bg-white p-4 shadow-sm"><div className="flex gap-4"><ProductThumb product={product} size="h-20 w-20" /><div className="min-w-0 flex-1"><h2 className="truncate font-semibold">{product.name}</h2><p className="mt-1 text-xs text-muted-foreground">{product.category.name} · {product.sku}</p><p className="mt-2 text-sm font-semibold">AED {(product.salePrice ?? product.regularPrice).toLocaleString()}</p></div></div><div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3"><div>{stockBadge(product.quantity)}</div><div className="flex gap-2"><Button variant="outline" size="icon" aria-label="View product" onClick={() => router.push(`/admin/products/${product.id}`)}><Eye className="h-4 w-4" /></Button><Button variant="outline" size="icon" aria-label="Edit product" onClick={() => router.push(`/admin/products/${product.id}/edit`)}><Pencil className="h-4 w-4" /></Button><Button variant="danger" size="icon" aria-label="Delete product" onClick={() => setPendingDelete(product)}><Trash2 className="h-4 w-4" /></Button></div></div></article>)}<div className="overflow-hidden rounded-xl border border-border bg-white"><Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filtered.length} pageSize={pageSize} onPageChange={setPage} /></div></div>
    </>}
    <ConfirmDialog open={Boolean(pendingDelete)} onClose={() => setPendingDelete(null)} onConfirm={handleDelete} title="Delete Product?" description={pendingDelete ? `Delete "${pendingDelete.name}" permanently?` : ""} confirmText="Delete Product" variant="danger" loading={deleting} />
  </div>;
}
