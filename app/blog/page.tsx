// app/blog/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Calendar, Tag, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog | Alphatech Computer Engineering & Technologies",
  description: "Computer tips, maintenance guides, technology news and updates from Alphatech.",
};

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-NG", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function excerpt(content: string, length = 160) {
  const plain = content.replace(/[#*`>\-]/g, "").replace(/\n+/g, " ").trim();
  return plain.length > length ? plain.slice(0, length) + "..." : plain;
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { publishedAt: { not: null } },
    orderBy: { publishedAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  return (
    <main>
      <section className="bg-slate-950 py-16">
        <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
          <p className="font-mono text-xs text-sky-400 tracking-widest">THE BLOG</p>
          <h1 className="font-display font-bold text-3xl lg:text-4xl text-white mt-3">
            Computer tips & tech news
          </h1>
          <p className="font-body text-slate-400 mt-3">
            Maintenance guides, buying advice and technology updates from our engineers.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display font-semibold text-xl text-slate-700">No posts yet</p>
              <p className="font-body text-slate-500 mt-2">
                Check back soon — our engineers are writing guides for you.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article key={post.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                  {post.coverImage ? (
                    <div className="h-44 overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-44 bg-gradient-to-br from-blue-900 to-slate-950 flex items-center justify-center">
                      <p className="font-mono text-xs text-sky-400 tracking-widest">ALPHATECH BLOG</p>
                    </div>
                  )}

                  <div className="p-5 flex flex-col flex-1">
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="font-mono text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="font-display font-bold text-lg text-slate-900 leading-snug hover:text-blue-700 transition-colors">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="font-body text-sm text-slate-500 mt-2 leading-relaxed flex-1">
                      {excerpt(post.content)}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 font-body text-xs text-slate-400">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(post.publishedAt!)}
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-center gap-1 font-body text-xs font-semibold text-blue-700 hover:text-blue-800"
                      >
                        Read more <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
