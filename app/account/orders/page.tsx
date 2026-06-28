// app/account/orders/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-50 text-yellow-700",
  PAID: "bg-blue-50 text-blue-700",
  PROCESSING: "bg-blue-50 text-blue-700",
  SHIPPED: "bg-purple-50 text-purple-700",
  DELIVERED: "bg-green-50 text-green-700",
  CANCELLED: "bg-red-50 text-red-700",
};

function formatPrice(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-NG", {
    day: "numeric", month: "short", year: "numeric"
  });
}

export default async function AccountOrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      items: { include: { product: { select: { name: true, images: true } } } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="bg-slate-50 min-h-[70vh] py-12">
      <div className="max-w-4xl mx-auto px-5 lg:px-8">
        <div className="mb-8">
          <Link href="/account" className="font-body text-sm text-blue-700 hover:underline">← Account</Link>
          <h1 className="font-display font-bold text-2xl text-slate-900 mt-1">My orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl">
            <ShoppingBag className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="font-display font-semibold text-slate-700">No orders yet</p>
            <p className="font-body text-sm text-slate-500 mt-1">Your orders will appear here once you shop.</p>
            <Link
              href="/store"
              className="inline-block mt-4 bg-blue-700 text-white font-body font-semibold px-5 py-2.5 rounded-lg text-sm"
            >
              Browse the store
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                  <div>
                    <p className="font-mono text-xs text-slate-400">ORDER</p>
                    <p className="font-mono text-sm font-bold text-slate-900">{o.orderNumber}</p>
                  </div>
                  <div className="text-right">
                    <span className={`font-mono text-[10px] px-2 py-1 rounded-full font-semibold ${STATUS_COLORS[o.status] ?? ""}`}>
                      {o.status}
                    </span>
                    <p className="font-body text-xs text-slate-400 mt-1">{formatDate(o.createdAt)}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {o.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-slate-100 shrink-0 overflow-hidden">
                        {item.product.images[0]
                          ? <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                          : <div className="w-full h-full bg-gradient-to-br from-slate-100 to-blue-50" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm text-slate-800 truncate">{item.product.name}</p>
                        <p className="font-body text-xs text-slate-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-display font-bold text-sm text-blue-800 shrink-0">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 mt-4 pt-4 flex justify-between items-center">
                  <p className="font-body text-sm text-slate-500">Total</p>
                  <p className="font-display font-bold text-blue-800">{formatPrice(o.total)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
