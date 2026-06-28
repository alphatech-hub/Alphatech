// app/store/page.tsx
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/store/ProductCard";
import StoreFilters from "@/components/store/StoreFilters";
import SearchBar from "@/components/store/SearchBar";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  searchParams: {
    search?: string;
    category?: string;
    condition?: string;
    sort?: string;
    page?: string;
  };
};

export const metadata = {
  title: "Shop Computers & Accessories | Alphatech",
  description:
    "Buy new and refurbished laptops, desktops, accessories and computer parts. Alphatech delivers to Osun and Ondo states, Nigeria.",
};

export default async function StorePage({ searchParams }: Props) {
  const search = searchParams.search ?? "";
  const category = searchParams.category ?? "";
  const condition = searchParams.condition ?? "";
  const sort = searchParams.sort ?? "newest";
  const page = Math.max(1, Number(searchParams.page ?? 1));
  const limit = 12;

  const where: any = {
    AND: [
      search ? { name: { contains: search, mode: "insensitive" } } : {},
      category ? { category: { slug: category } } : {},
      condition ? { condition } : {},
    ],
  };

  const orderBy: any =
    sort === "price-asc"
      ? { price: "asc" }
      : sort === "price-desc"
      ? { price: "desc" }
      : { createdAt: "desc" };

  const [products, total, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        category: { select: { name: true, slug: true } },
        reviews: { select: { rating: true } },
      },
    }),
    prisma.product.count({ where }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { products: true } } },
    }),
  ]);

  const pages = Math.ceil(total / limit);

  function pageUrl(p: number) {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (condition) params.set("condition", condition);
    if (sort !== "newest") params.set("sort", sort);
    params.set("page", String(p));
    return `/store?${params.toString()}`;
  }

  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="bg-slate-950 py-10">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <p className="font-mono text-xs text-sky-400 tracking-widest">THE STORE</p>
          <h1 className="font-display font-bold text-3xl lg:text-4xl text-white mt-2">
            Shop computers & accessories
          </h1>
          <p className="font-body text-slate-400 mt-2">
            {total} product{total !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>

        <div className="flex gap-8 items-start">
          <Suspense>
            <StoreFilters categories={categories} />
          </Suspense>

          <div className="flex-1 min-w-0">
            {products.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-display font-semibold text-xl text-slate-700">No products found</p>
                <p className="font-body text-slate-500 mt-2">Try a different search or filter.</p>
                <Link
                  href="/store"
                  className="inline-block mt-4 bg-blue-700 text-white font-body font-semibold px-5 py-2.5 rounded-lg"
                >
                  Clear filters
                </Link>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {products.map((p) => (
                    <ProductCard
                      key={p.id}
                      id={p.id}
                      slug={p.slug}
                      name={p.name}
                      price={p.price}
                      compareAtPrice={p.compareAtPrice}
                      condition={p.condition}
                      images={p.images}
                      reviews={p.reviews}
                    />
                  ))}
                </div>

                {pages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    {page > 1 && (
                      <Link href={pageUrl(page - 1)} className="h-9 w-9 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-white">
                        <ChevronLeft className="h-4 w-4" />
                      </Link>
                    )}
                    {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                      <Link
                        key={p}
                        href={pageUrl(p)}
                        className={`h-9 w-9 flex items-center justify-center rounded-lg font-body text-sm transition-colors ${
                          p === page
                            ? "bg-blue-700 text-white"
                            : "border border-slate-200 hover:bg-white text-slate-600"
                        }`}
                      >
                        {p}
                      </Link>
                    ))}
                    {page < pages && (
                      <Link href={pageUrl(page + 1)} className="h-9 w-9 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-white">
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
