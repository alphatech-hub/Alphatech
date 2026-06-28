// app/admin/blog/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Pencil, Eye, EyeOff } from "lucide-react";
import DeleteBlogPostButton from "@/components/admin/DeleteBlogPostButton";

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Blog posts</h1>
          <p className="font-body text-sm text-slate-400 mt-1">{posts.length} total posts</p>
        </div>
        <Link href="/admin/blog/new"
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-body font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors">
          <Plus className="h-4 w-4" /> New post
        </Link>
      </div>

      <div className="space-y-3">
        {posts.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-12 text-center">
            <p className="font-body text-sm text-slate-500">No blog posts yet.</p>
            <Link href="/admin/blog/new" className="inline-block mt-3 text-sky-400 font-body text-sm hover:underline">
              Write your first post
            </Link>
          </div>
        ) : posts.map((post) => (
          <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-body font-semibold text-sm text-white">{post.title}</h3>
                {post.publishedAt ? (
                  <span className="flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-full bg-green-900/50 text-green-400">
                    <Eye className="h-3 w-3" /> Published
                  </span>
                ) : (
                  <span className="flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-400">
                    <EyeOff className="h-3 w-3" /> Draft
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-1 font-body text-xs text-slate-500">
                <span>{post.author.name}</span>
                <span>{formatDate(post.createdAt)}</span>
                {post.tags.length > 0 && <span>{post.tags.join(", ")}</span>}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {post.publishedAt && (
                <Link href={`/blog/${post.slug}`} target="_blank"
                  className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
                  <Eye className="h-3.5 w-3.5" />
                </Link>
              )}
              <Link href={`/admin/blog/${post.slug}/edit`}
                className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
                <Pencil className="h-3.5 w-3.5" />
              </Link>
              <DeleteBlogPostButton slug={post.slug} title={post.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
