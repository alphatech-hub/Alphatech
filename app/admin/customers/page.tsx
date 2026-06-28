// app/admin/customers/page.tsx
import { prisma } from "@/lib/prisma";

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}

export default async function AdminCustomersPage() {
  const customers = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { orders: true, repairs: true } },
    },
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-white">Customers</h1>
        <p className="font-body text-sm text-slate-400 mt-1">{customers.length} registered customers</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest">NAME</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest">EMAIL</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest">PHONE</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest">ORDERS</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest">REPAIRS</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest">JOINED</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {customers.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center font-body text-sm text-slate-500">No customers yet</td></tr>
              ) : customers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-5 py-4 font-body font-semibold text-sm text-white">{c.name}</td>
                  <td className="px-5 py-4 font-body text-sm text-slate-400">{c.email}</td>
                  <td className="px-5 py-4 font-body text-sm text-slate-400">{c.phone ?? "—"}</td>
                  <td className="px-5 py-4 font-mono text-sm text-slate-300">{c._count.orders}</td>
                  <td className="px-5 py-4 font-mono text-sm text-slate-300">{c._count.repairs}</td>
                  <td className="px-5 py-4 font-body text-xs text-slate-400">{formatDate(c.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
