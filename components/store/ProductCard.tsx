// components/store/ProductCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/lib/store/cart";

type Props = {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number | null;
  condition: string;
  images: string[];
  reviews: { rating: number }[];
};

function formatPrice(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

function avgRating(reviews: { rating: number }[]) {
  if (!reviews.length) return null;
  return (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
}

export default function ProductCard({ id, slug, name, price, compareAtPrice, condition, images, reviews }: Props) {
  const addItem = useCart((s) => s.addItem);
  const rating = avgRating(reviews);

  const conditionColor =
    condition === "NEW"
      ? "text-green-600 bg-green-50"
      : condition === "REFURBISHED"
      ? "text-blue-600 bg-blue-50"
      : "text-orange-600 bg-orange-50";

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group flex flex-col">
      <Link href={`/product/${slug}`} className="relative block overflow-hidden">
        <div className="h-44 bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center">
          {images[0] ? (
            <Image
              src={images[0]}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <ShoppingCart className="h-12 w-12 text-slate-300" />
          )}
        </div>
        <span className={`absolute top-2 left-2 font-mono text-[10px] px-2 py-0.5 rounded font-semibold ${conditionColor}`}>
          {condition}
        </span>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link href={`/product/${slug}`}>
          <h3 className="font-body font-semibold text-sm text-slate-900 leading-snug hover:text-blue-700 transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>

        {rating && (
          <div className="flex items-center gap-1 mt-1.5">
            <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
            <span className="font-mono text-xs text-slate-500">{rating} ({reviews.length})</span>
          </div>
        )}

        <div className="mt-auto pt-3 flex items-center justify-between">
          <div>
            <p className="font-display font-bold text-blue-800">{formatPrice(price)}</p>
            {compareAtPrice && compareAtPrice > price && (
              <p className="font-body text-xs text-slate-400 line-through">{formatPrice(compareAtPrice)}</p>
            )}
          </div>
          <button
            onClick={() => addItem({ id, slug, name, price, image: images[0] ?? "" })}
            className="h-9 w-9 rounded-lg bg-blue-700 hover:bg-blue-800 flex items-center justify-center transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
