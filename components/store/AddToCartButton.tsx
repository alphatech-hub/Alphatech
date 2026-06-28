// components/store/AddToCartButton.tsx
"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/lib/store/cart";

type Props = {
  product: { id: string; slug: string; name: string; price: number; image: string };
  inStock: boolean;
};

export default function AddToCartButton({ product, inStock }: Props) {
  const addItem = useCart((s) => s.addItem);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={!inStock}
      className={`w-full flex items-center justify-center gap-2 font-body font-semibold px-6 py-3.5 rounded-xl transition-all ${
        !inStock
          ? "bg-slate-200 text-slate-400 cursor-not-allowed"
          : added
          ? "bg-green-600 text-white"
          : "bg-orange-500 hover:bg-orange-600 text-white"
      }`}
    >
      {added ? (
        <>
          <Check className="h-5 w-5" /> Added to cart
        </>
      ) : (
        <>
          <ShoppingCart className="h-5 w-5" />
          {inStock ? "Add to cart" : "Out of stock"}
        </>
      )}
    </button>
  );
}
