// app/cart/page.tsx
"use client";

import Link from "next/link";
import { useCart } from "@/lib/store/cart";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

function formatPrice(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, count } = useCart();

  if (items.length === 0) {
    return (
      <main className="bg-slate-50 min-h-[70vh] flex items-center justify-center px-5">
        <div className="text-center">
          <ShoppingBag className="h-14 w-14 text-slate-300 mx-auto mb-4" />
          <h1 className="font-display font-bold text-2xl text-slate-900">Your cart is empty</h1>
          <p className="font-body text-slate-500 mt-2">Add some products to get started.</p>
          <Link
            href="/store"
            className="inline-block mt-6 bg-blue-700 hover:bg-blue-800 text-white font-body font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Browse the store
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-slate-50 min-h-[70vh] py-12">
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        <h1 className="font-display font-bold text-2xl lg:text-3xl text-slate-900 mb-8">
          Your cart ({count()} item{count() !== 1 ? "s" : ""})
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-4 flex gap-4 items-center">
                <div className="h-16 w-16 rounded-lg bg-slate-100 shrink-0 overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-blue-50" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.slug}`} className="font-body font-semibold text-sm text-slate-900 hover:text-blue-700 line-clamp-2">
                    {item.name}
                  </Link>
                  <p className="font-display font-bold text-blue-800 mt-1">{formatPrice(item.price)}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="font-mono text-sm w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-7 w-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>

                <p className="font-display font-bold text-sm text-slate-900 w-24 text-right shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </p>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-xl p-5 sticky top-20">
              <h2 className="font-display font-semibold text-slate-900 mb-4">Order summary</h2>
              <div className="space-y-2 font-body text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({count()} items)</span>
                  <span>{formatPrice(total())}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery</span>
                  <span className="text-green-600">Calculated at checkout</span>
                </div>
                <div className="border-t border-slate-200 pt-2 mt-2 flex justify-between font-semibold text-slate-900">
                  <span>Total</span>
                  <span className="font-display font-bold text-blue-800">{formatPrice(total())}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-5 w-full flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-body font-semibold py-3.5 rounded-xl transition-colors"
              >
                Proceed to checkout
              </Link>
              <Link
                href="/store"
                className="mt-3 w-full flex items-center justify-center border border-slate-200 hover:bg-slate-50 text-slate-700 font-body font-semibold py-3 rounded-xl transition-colors text-sm"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
