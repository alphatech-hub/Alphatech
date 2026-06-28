// app/admin/products/new/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImageUploader from "@/components/admin/ImageUploader";

type Category = { id: string; name: string };

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "", slug: "", description: "", price: "",
    compareAtPrice: "", condition: "NEW", brand: "",
    sku: "", stockQuantity: "1", categoryId: "", isFeatured: false,
  });

  useEffect(() => {
    fetch("/api/categories").then((r) => r.json()).then(setCategories);
  }, []);

  function update(field: keyof typeof form, value: any) {
    setForm((f) => ({ ...f, [field]: value }));
    if (field === "name") {
      setForm((f) => ({
        ...f, name: value,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseInt(form.price),
          compareAtPrice: form.compareAtPrice ? parseInt(form.compareAtPrice) : null,
          stockQuantity: parseInt(form.stockQuantity),
          images,
          specs: {},
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to create product");
      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-sky-400";
  const labelClass = "font-body text-xs text-slate-400 block mb-1.5";

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="mb-8">
        <Link href="/admin/products" className="font-body text-sm text-sky-400 hover:underline">← Products</Link>
        <h1 className="font-display font-bold text-2xl text-white mt-2">Add new product</h1>
      </div>

      {error && <p className="font-body text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2 mb-6">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Images */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h2 className="font-display font-semibold text-white text-sm mb-4">Product images</h2>
          <ImageUploader images={images} onImagesChange={setImages} maxImages={5} label="Upload up to 5 images · First image is shown as the main photo" />
        </div>

        {/* Basic info */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h2 className="font-display font-semibold text-white text-sm">Basic information</h2>
          <div>
            <label className={labelClass}>Product name *</label>
            <input required type="text" value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>URL slug *</label>
            <input required type="text" value={form.slug} onChange={(e) => update("slug", e.target.value)} className={inputClass} />
            <p className="font-mono text-[10px] text-slate-500 mt-1">alphatech.ng/product/{form.slug || "..."}</p>
          </div>
          <div>
            <label className={labelClass}>Description *</label>
            <textarea required rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} className={`${inputClass} resize-none`} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Brand</label>
              <input type="text" value={form.brand} onChange={(e) => update("brand", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>SKU</label>
              <input type="text" value={form.sku} onChange={(e) => update("sku", e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h2 className="font-display font-semibold text-white text-sm">Pricing & inventory</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Price (₦) *</label>
              <input required type="number" min="0" value={form.price} onChange={(e) => update("price", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Compare-at price (₦)</label>
              <input type="number" min="0" value={form.compareAtPrice} onChange={(e) => update("compareAtPrice", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Stock quantity *</label>
              <input required type="number" min="0" value={form.stockQuantity} onChange={(e) => update("stockQuantity", e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h2 className="font-display font-semibold text-white text-sm">Categorization</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Category *</label>
              <select required value={form.categoryId} onChange={(e) => update("categoryId", e.target.value)} className={`${inputClass} cursor-pointer`}>
                <option value="">Select a category</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Condition</label>
              <select value={form.condition} onChange={(e) => update("condition", e.target.value)} className={`${inputClass} cursor-pointer`}>
                <option value="NEW">New</option>
                <option value="REFURBISHED">Refurbished</option>
                <option value="CUSTOM">Custom Build</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="featured" checked={form.isFeatured} onChange={(e) => update("isFeatured", e.target.checked)} className="h-4 w-4 rounded accent-blue-600" />
            <label htmlFor="featured" className="font-body text-sm text-slate-300 cursor-pointer">Feature this product on the homepage</label>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-body font-semibold px-6 py-3 rounded-xl transition-colors">
            {loading ? "Saving..." : "Save product"}
          </button>
          <Link href="/admin/products" className="border border-slate-700 text-slate-300 font-body font-semibold px-6 py-3 rounded-xl hover:border-slate-500 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
