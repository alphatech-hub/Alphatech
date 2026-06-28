// app/blog/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, ArrowLeft, Tag } from "lucide-react";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props) {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
  if (!post) return {};
  return {
    title: `${post.title} | Alphatech Blog`,
    description: post.content.replace(/[#*`>\-]/g, "").slice(0, 155),
  };
}

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-NG", {
    day: "numeric", month: "long", year: "numeric",
  });
}

// Simple markdown-to-HTML renderer for basic formatting
function renderContent(content: string) {
  return content
    .split("\n")
    .map((line) => {
      if (line.startsWith("## ")) return `<h2 class="font-display font-bold text-xl text-slate-900 mt-8 mb-3">${line.slice(3)}</h2>`;
      if (line.startsWith("### ")) return `<h3 class="font-display font-semibold text-lg text-slate-900 mt-6 mb-2">${line.slice(4)}</h3>`;
      if (line.startsWith("# ")) return `<h1 class="font-display font-bold text-2xl text-slate-900 mt-8 mb-4">${line.slice(2)}</h1>`;
      if (line.startsWith("- ")) return `<li class="font-body text-slate-700 ml-4 list-disc">${line.slice(2)}</li>`;
      if (line.startsWith("**") && line.endsWith("**")) return `<strong class="font-semibold text-slate-900">${line.slice(2, -2)}</strong>`;
      if (line.trim() === "") return "<br />";
      return `<p class="font-body text-slate-700 leading-relaxed mb-4">${line}</p>`;
    })
    .join("\n");
}

export default async function BlogPostPage({ params }: Props) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
    include: { author: { select: { name: true } } },
  });

  if (!post || !post.publishedAt) notFound();

  // Get 3 related posts
  const related = await prisma.blogPost.findMany({
    where: {
      publishedAt: { not: null },
      slug: { not: post.slug },
    },
    take: 3,
    orderBy: { publishedAt: "desc" },
  });

  return (
    <main>
      {/* Hero */}
      <section className="bg-slate-950 py-12">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-body text-sm text-sky-400 hover:underline mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to blog
          </Link>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 font-mono text-xs px-2.5 py-1 bg-blue-900/50 text-sky-400 rounded-full">
                  <Tag className="h-3 w-3" /> {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-display font-bold text-3xl lg:text-4xl text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mt-5 font-body text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(post.publishedAt)}
            </span>
            <span>By {post.author.name}</span>
          </div>
        </div>
      </section>

      {/* Cover image */}
      {post.coverImage && (
        <div className="max-w-3xl mx-auto px-5 lg:px-8 -mt-6">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-xl"
          />
        </div>
      )}

      {/* Content */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <div
            className="prose-content"
            dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <h2 className="font-display font-bold text-xl text-slate-900">
            Need help with your computer?
          </h2>
          <p className="font-body text-slate-500 mt-2">
            Our engineers are ready to diagnose, repair and advise.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-5">
            <Link href="/book-repair" className="bg-orange-500 hover:bg-orange-600 text-white font-body font-semibold px-5 py-2.5 rounded-xl transition-colors">
              Book a repair
            </Link>
            <Link href="/contact" className="border border-slate-300 hover:border-slate-400 text-slate-700 font-body font-semibold px-5 py-2.5 rounded-xl transition-colors">
              Contact us
            </Link>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="bg-white py-12">
          <div className="max-w-5xl mx-auto px-5 lg:px-8">
            <h2 className="font-display font-bold text-xl text-slate-900 mb-6">More from the blog</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link key={r.id} href={`/blog/${r.slug}`} className="group block">
                  <div className="h-32 bg-gradient-to-br from-blue-900 to-slate-950 rounded-xl mb-3 overflow-hidden">
                    {r.coverImage && (
                      <img src={r.coverImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    )}
                  </div>
                  <h3 className="font-display font-semibold text-sm text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                    {r.title}
                  </h3>
                  <p className="font-body text-xs text-slate-400 mt-1">{formatDate(r.publishedAt!)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
