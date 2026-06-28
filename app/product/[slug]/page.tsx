// app/product/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/store/AddToCartButton";
import { Star, ShieldCheck, Truck, RefreshCw } from "lucide-react";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product) return {};
  return {
    title: `${product.name} | Alphatech Store`,
    description: product.description.slice(0, 155),
  };
}

function formatPrice(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

export default async function ProductPage({ params }: Props) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      reviews: {
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!product) notFound();

  const avgRating =
    product.reviews.length
      ? (product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length).toFixed(1)
      : null;

  const specs = product.specs as Record<string, string> | null;

  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image gallery */}
          <div>
            <div className="bg-gradient-to-br from-slate-100 to-blue-50 rounded-2xl aspect-square flex items-center justify-center overflow-hidden">
              {product.images[0] ? (
                <img src={product.images[0]} alt={product.name} className="object-contain w-full h-full p-8" />
              ) : (
                <p className="font-body text-slate-400 text-sm">No image yet</p>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-3">
                {product.images.slice(1, 5).map((img, i) => (
                  <div key={i} className="aspect-square bg-slate-100 rounded-lg overflow-hidden">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div>
            <p className="font-mono text-xs text-slate-400 tracking-widest uppercase">{product.category.name}</p>
            <h1 className="font-display font-bold text-2xl lg:text-3xl text-slate-900 mt-2 leading-tight">
              {product.name}
            </h1>

            {avgRating && (
              <div className="flex items-center gap-2 mt-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.round(Number(avgRating)) ? "fill-orange-400 text-orange-400" : "text-slate-200"}`}
                    />
                  ))}
                </div>
                <span className="font-body text-sm text-slate-500">
                  {avgRating} ({product.reviews.length} review{product.reviews.length !== 1 ? "s" : ""})
                </span>
              </div>
            )}

            <div className="flex items-baseline gap-3 mt-4">
              <p className="font-display font-bold text-3xl text-blue-800">{formatPrice(product.price)}</p>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <p className="font-body text-lg text-slate-400 line-through">{formatPrice(product.compareAtPrice)}</p>
              )}
            </div>

            <div className="mt-2">
              <span className={`font-mono text-xs px-2 py-1 rounded font-semibold ${
                product.stockQuantity > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              }`}>
                {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : "Out of stock"}
              </span>
            </div>

            <p className="font-body text-slate-600 mt-5 leading-relaxed">{product.description}</p>

            <div className="mt-6">
              <AddToCartButton
                product={{
                  id: product.id,
                  slug: product.slug,
                  name: product.name,
                  price: product.price,
                  image: product.images[0] ?? "",
                }}
                inStock={product.stockQuantity > 0}
              />
            </div>

            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { icon: ShieldCheck, label: "90-day warranty" },
                { icon: Truck, label: "Delivery available" },
                { icon: RefreshCw, label: "Easy returns" },
              ].map((b) => (
                <div key={b.label} className="border border-slate-200 rounded-xl p-3 text-center">
                  <b.icon className="h-4 w-4 text-blue-700 mx-auto mb-1" />
                  <p className="font-body text-xs text-slate-600">{b.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specs */}
        {specs && Object.keys(specs).length > 0 && (
          <div className="mt-14">
            <h2 className="font-display font-bold text-xl text-slate-900 mb-4">Specifications</h2>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              {Object.entries(specs).map(([key, value], i) => (
                <div key={key} className={`flex px-5 py-3 font-body text-sm ${i % 2 === 0 ? "bg-slate-50" : "bg-white"}`}>
                  <span className="w-40 shrink-0 font-semibold text-slate-700 capitalize">{key}</span>
                  <span className="text-slate-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {product.reviews.length > 0 && (
          <div className="mt-14">
            <h2 className="font-display font-bold text-xl text-slate-900 mb-6">Customer reviews</h2>
            <div className="space-y-4">
              {product.reviews.map((r) => (
                <div key={r.id} className="border border-slate-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-orange-400 text-orange-400" : "text-slate-200"}`} />
                      ))}
                    </div>
                    <span className="font-body font-semibold text-sm text-slate-800">{r.user.name}</span>
                  </div>
                  {r.comment && <p className="font-body text-sm text-slate-600">{r.comment}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
