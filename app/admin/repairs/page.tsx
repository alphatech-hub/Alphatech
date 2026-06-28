// app/admin/repairs/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import RepairStatusUpdater from "@/components/admin/RepairStatusUpdater";

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}

const STATUS_COLORS: Record<string, string> = {
  RECEIVED: "bg-slate-700 text-slate-200",
  DIAGNOSING: "bg-yellow-900/60 text-yellow-300",
  AWAITING_PARTS: "bg-orange-900/60 text-orange-300",
  REPAIRING: "bg-blue-900/60 text-blue-300",
  READY: "bg-green-900/60 text-green-300",
  COMPLETED: "bg-green-800/60 text-green-200",
  CANCELLED: "bg-red-900/60 text-red-300",
};

export default async function AdminRepairsPage() {
  const repairs = await prisma.repair.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, email: true } } },
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-white">Repair tickets</h1>
        <p className="font-body text-sm text-slate-400 mt-1">{repairs.length} total tickets</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest">TICKET</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest">DEVICE</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest">CUSTOMER</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest">DATE</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest">STATUS</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] text-slate-500 tracking-widest">UPDATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {repairs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center font-body text-sm text-slate-500">No repair tickets yet</td>
                </tr>
              ) : repairs.map((r) => (
                <tr key={r.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-sky-400">{r.ticketNumber}</td>
                  <td className="px-5 py-4">
                    <p className="font-body text-sm text-white">{r.deviceType}</p>
                    {r.brandModel && <p className="font-body text-xs text-slate-400">{r.brandModel}</p>}
                  </td>
                  <td className="px-5 py-4">
                    {r.user ? (
                      <p className="font-body text-sm text-slate-300">{r.user.name}</p>
                    ) : (
                      <p className="font-body text-xs text-slate-500">Guest</p>
                    )}
                  </td>
                  <td className="px-5 py-4 font-body text-xs text-slate-400">{formatDate(r.createdAt)}</td>
                  <td className="px-5 py-4">
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${STATUS_COLORS[r.status] ?? ""}`}>
                      {r.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <RepairStatusUpdater ticketNumber={r.ticketNumber} currentStatus={r.status} />
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
