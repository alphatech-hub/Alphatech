// components/store/StoreFilters.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Category = { id: string; name: string; slug: string; _count: { products: number } };

type Props = { categories: Category[] };

const CONDITIONS = [
  { value: "", label: "All" },
  { value: "NEW", label: "New" },
  { value: "REFURBISHED", label: "Refurbished" },
  { value: "CUSTOM", label: "Custom Build" },
];

export default function StoreFilters({ categories }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const update = useCallback(
    (key: string, value: string) => {
      const p = new URLSearchParams(params.toString());
      if (value) p.set(key, value);
      else p.delete(key);
      p.delete("page");
      router.push(`/store?${p.toString()}`);
    },
    [params, router]
  );

  const active = (key: string, value: string) => params.get(key) === value;

  return (
    <aside className="w-full lg:w-56 shrink-0">
      <div className="bg-white border border-slate-200 rounded-xl p-5 sticky top-20 space-y-6">
        <div>
          <p className="font-display font-semibold text-xs text-slate-400 tracking-widest uppercase mb-3">Category</p>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => update("category", "")}
                className={`w-full text-left font-body text-sm px-2 py-1.5 rounded-lg transition-colors ${
                  !params.get("category") ? "bg-blue-700 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                All products
              </button>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => update("category", c.slug)}
                  className={`w-full text-left font-body text-sm px-2 py-1.5 rounded-lg transition-colors flex justify-between items-center ${
                    active("category", c.slug) ? "bg-blue-700 text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span>{c.name}</span>
                  <span className={`text-xs ${active("category", c.slug) ? "text-blue-200" : "text-slate-400"}`}>
                    {c._count.products}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display font-semibold text-xs text-slate-400 tracking-widest uppercase mb-3">Condition</p>
          <ul className="space-y-1">
            {CONDITIONS.map((c) => (
              <li key={c.value}>
                <button
                  onClick={() => update("condition", c.value)}
                  className={`w-full text-left font-body text-sm px-2 py-1.5 rounded-lg transition-colors ${
                    (params.get("condition") ?? "") === c.value
                      ? "bg-blue-700 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {c.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display font-semibold text-xs text-slate-400 tracking-widest uppercase mb-3">Sort by</p>
          <select
            value={params.get("sort") ?? "newest"}
            onChange={(e) => update("sort", e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 font-body text-sm text-slate-700 focus:outline-none focus:border-blue-400"
          >
            <option value="newest">Newest first</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
            <option value="popular">Most reviewed</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
