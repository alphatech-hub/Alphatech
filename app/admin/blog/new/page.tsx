// app/admin/blog/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "", slug: "", content: "",
    coverImage: "", tags: "", published: false,
  });

  function update(field: keyof typeof form, value: any) {
    setForm((f) => ({ ...f, [field]: value }));
    if (field === "title") {
      setForm((f) => ({
        ...f,
        title: value,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to create post");
      router.push("/admin/blog");
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
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/admin/blog" className="font-body text-sm text-sky-400 hover:underline">← Blog</Link>
        <h1 className="font-display font-bold text-2xl text-white mt-2">New blog post</h1>
      </div>

      {error && (
        <p className="font-body text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2 mb-6">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div>
            <label className={labelClass}>Title *</label>
            <input required type="text" value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="e.g. How to speed up your laptop in 5 steps"
              className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>URL slug *</label>
            <input required type="text" value={form.slug}
              onChange={(e) => update("slug", e.target.value)}
              className={inputClass} />
            <p className="font-mono text-[10px] text-slate-500 mt-1">alphatech.ng/blog/{form.slug || "..."}</p>
          </div>

          <div>
            <label className={labelClass}>Cover image URL (optional)</label>
            <input type="url" value={form.coverImage}
              onChange={(e) => update("coverImage", e.target.value)}
              placeholder="https://..."
              className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Tags (comma separated)</label>
            <input type="text" value={form.tags}
              onChange={(e) => update("tags", e.target.value)}
              placeholder="e.g. Maintenance, Tips, Windows"
              className={inputClass} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <label className={labelClass}>
            Content * <span className="text-slate-600">(supports basic markdown: # Heading, ## Subheading, - bullet)</span>
          </label>
          <textarea
            required
            rows={20}
            value={form.content}
            onChange={(e) => update("content", e.target.value)}
            placeholder={`## Introduction\n\nWrite your blog post content here...\n\n## Section heading\n\nMore content...\n\n- Bullet point one\n- Bullet point two`}
            className={`${inputClass} resize-y font-mono text-xs leading-relaxed`}
          />
          <p className="font-body text-xs text-slate-500 mt-1">{form.content.length} characters</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-3">
            <input type="checkbox" id="published" checked={form.published}
              onChange={(e) => update("published", e.target.checked)}
              className="h-4 w-4 rounded accent-blue-600" />
            <label htmlFor="published" className="font-body text-sm text-slate-300 cursor-pointer">
              Publish immediately (visible to all visitors)
            </label>
          </div>
          {!form.published && (
            <p className="font-body text-xs text-slate-500 mt-2 ml-7">
              Leave unchecked to save as a draft — only you can see it.
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-body font-semibold px-6 py-3 rounded-xl transition-colors">
            {loading ? "Saving..." : form.published ? "Publish post" : "Save as draft"}
          </button>
          <Link href="/admin/blog"
            className="border border-slate-700 text-slate-300 font-body font-semibold px-6 py-3 rounded-xl hover:border-slate-500 transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
