// app/admin/orders/page.tsx
import { prisma } from "@/lib/prisma";

function formatPrice(n: number) { return "₦" + n.toLocaleString("en-NG"); }
function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-900/60 text-yellow-300",
  PAID: "bg-blue-900/60 text-blue-300",
  PROCESSING: "bg-blue-900/60 text-blue-300",
  SHIPPED: "bg-purple-900/60 text-purple-300",
  DELIVERED: "bg-green-900/60 text-green-300",
  CANCELLED: "bg-red-900/60 text-red-300",
};

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      items: { include: { product: { select: { name: true } } } },
    },
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-white">Orders</h1>
        <p className="font-body text-sm text-slate-400 mt-1">{orders.length} total orders</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest">ORDER</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest">CUSTOMER</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest">ITEMS</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest">TOTAL</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest">DATE</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {orders.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center font-body text-sm text-slate-500">No orders yet</td></tr>
              ) : orders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-slate-300">{o.orderNumber}</td>
                  <td className="px-5 py-4">
                    <p className="font-body text-sm text-white">{o.user?.name ?? "Guest"}</p>
                    {o.user?.email && <p className="font-body text-xs text-slate-500">{o.user.email}</p>}
                  </td>
                  <td className="px-5 py-4">
                    <div className="space-y-0.5">
                      {o.items.map((item) => (
                        <p key={item.id} className="font-body text-xs text-slate-400 line-clamp-1">
                          {item.quantity}× {item.product.name}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4 font-display font-bold text-sm text-white">{formatPrice(o.total)}</td>
                  <td className="px-5 py-4 font-body text-xs text-slate-400">{formatDate(o.createdAt)}</td>
                  <td className="px-5 py-4">
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${STATUS_COLORS[o.status] ?? "bg-slate-700 text-slate-300"}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
