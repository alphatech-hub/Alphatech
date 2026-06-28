// app/admin/page.tsx
import { prisma } from "@/lib/prisma";
import { Users, Package, ShoppingCart, Wrench, MessageSquare, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";

function formatPrice(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-NG", { day: "numeric", month: "short" });
}

const STATUS_COLORS: Record<string, string> = {
  RECEIVED: "bg-slate-700 text-slate-200",
  DIAGNOSING: "bg-yellow-900/60 text-yellow-300",
  AWAITING_PARTS: "bg-orange-900/60 text-orange-300",
  REPAIRING: "bg-blue-900/60 text-blue-300",
  READY: "bg-green-900/60 text-green-300",
  COMPLETED: "bg-green-800/60 text-green-200",
  CANCELLED: "bg-red-900/60 text-red-300",
  PENDING: "bg-yellow-900/60 text-yellow-300",
  PAID: "bg-blue-900/60 text-blue-300",
  DELIVERED: "bg-green-900/60 text-green-300",
};

export default async function AdminDashboardPage() {
  const [
    userCount, productCount, orderCount, repairCount,
    openMessages, pendingRepairs, recentOrders, recentRepairs,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.product.count(),
    prisma.order.count(),
    prisma.repair.count(),
    prisma.message.count({ where: { status: "OPEN" } }),
    prisma.repair.count({ where: { status: { notIn: ["COMPLETED", "CANCELLED"] } } }),
    prisma.order.findMany({
      take: 5, orderBy: { createdAt: "desc" },
      include: { items: true },
    }),
    prisma.repair.findMany({
      take: 5, orderBy: { createdAt: "desc" },
    }),
  ]);

  const stats = [
    { icon: Users, label: "Customers", value: userCount, href: "/admin/customers", color: "text-sky-400" },
    { icon: Package, label: "Products", value: productCount, href: "/admin/products", color: "text-blue-400" },
    { icon: ShoppingCart, label: "Orders", value: orderCount, href: "/admin/orders", color: "text-orange-400" },
    { icon: Wrench, label: "Repairs", value: repairCount, href: "/admin/repairs", color: "text-purple-400" },
    { icon: MessageSquare, label: "Open messages", value: openMessages, href: "/admin/messages", color: "text-yellow-400" },
    { icon: Clock, label: "Active repairs", value: pendingRepairs, href: "/admin/repairs", color: "text-green-400" },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-white">Dashboard</h1>
        <p className="font-body text-sm text-slate-400 mt-1">Welcome back. Here's what's happening at Alphatech.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-600 transition-colors"
          >
            <s.icon className={`h-5 w-5 mb-3 ${s.color}`} />
            <p className="font-display font-bold text-2xl text-white">{s.value}</p>
            <p className="font-body text-xs text-slate-400 mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent orders */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
            <h2 className="font-display font-semibold text-white">Recent orders</h2>
            <Link href="/admin/orders" className="font-body text-xs text-sky-400 hover:underline">View all</Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="font-body text-sm text-slate-500 px-5 py-8 text-center">No orders yet</p>
          ) : (
            <div className="divide-y divide-slate-800">
              {recentOrders.map((o) => (
                <div key={o.id} className="flex items-center justify-between px-5 py-3.5">
                  <div>
                    <p className="font-mono text-xs text-slate-300">{o.orderNumber}</p>
                    <p className="font-body text-xs text-slate-500 mt-0.5">{formatDate(o.createdAt)} · {o.items.length} item{o.items.length !== 1 ? "s" : ""}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold text-sm text-white">{formatPrice(o.total)}</p>
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${STATUS_COLORS[o.status] ?? "bg-slate-700 text-slate-300"}`}>
                      {o.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent repairs */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
            <h2 className="font-display font-semibold text-white">Recent repairs</h2>
            <Link href="/admin/repairs" className="font-body text-xs text-sky-400 hover:underline">View all</Link>
          </div>
          {recentRepairs.length === 0 ? (
            <p className="font-body text-sm text-slate-500 px-5 py-8 text-center">No repairs yet</p>
          ) : (
            <div className="divide-y divide-slate-800">
              {recentRepairs.map((r) => (
                <div key={r.id} className="flex items-center justify-between px-5 py-3.5">
                  <div>
                    <p className="font-mono text-xs text-sky-400">{r.ticketNumber}</p>
                    <p className="font-body text-xs text-slate-300 mt-0.5">{r.deviceType}{r.brandModel ? ` · ${r.brandModel}` : ""}</p>
                    <p className="font-body text-xs text-slate-500">{formatDate(r.createdAt)}</p>
                  </div>
                  <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${STATUS_COLORS[r.status] ?? "bg-slate-700 text-slate-300"}`}>
                    {r.status.replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
