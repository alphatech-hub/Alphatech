// components/store/SearchBar.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const [value, setValue] = useState(params.get("search") ?? "");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const p = new URLSearchParams(params.toString());
    if (value.trim()) p.set("search", value.trim());
    else p.delete("search");
    p.delete("page");
    router.push(`/store?${p.toString()}`);
  }

  function clear() {
    setValue("");
    const p = new URLSearchParams(params.toString());
    p.delete("search");
    router.push(`/store?${p.toString()}`);
  }

  return (
    <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products..."
        className="w-full pl-9 pr-9 py-2.5 border border-slate-200 rounded-lg font-body text-sm focus:outline-none focus:border-blue-400"
      />
      {value && (
        <button
          type="button"
          onClick={clear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}
