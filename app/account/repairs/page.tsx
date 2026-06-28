// app/account/repairs/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Wrench, ChevronRight } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  RECEIVED: "bg-slate-100 text-slate-700",
  DIAGNOSING: "bg-yellow-50 text-yellow-700",
  AWAITING_PARTS: "bg-orange-50 text-orange-700",
  REPAIRING: "bg-blue-50 text-blue-700",
  READY: "bg-green-50 text-green-700",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-50 text-red-700",
};

export default async function AccountRepairsPage() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const repairs = await prisma.repair.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="bg-slate-50 min-h-[70vh] py-12">
      <div className="max-w-4xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/account" className="font-body text-sm text-blue-700 hover:underline">← Account</Link>
            <h1 className="font-display font-bold text-2xl text-slate-900 mt-1">My repairs</h1>
          </div>
          <Link
            href="/book-repair"
            className="bg-orange-500 hover:bg-orange-600 text-white font-body font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors"
          >
            Book a repair
          </Link>
        </div>

        {repairs.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl">
            <Wrench className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="font-display font-semibold text-slate-700">No repairs yet</p>
            <p className="font-body text-sm text-slate-500 mt-1">Book your first repair and it will appear here.</p>
            <Link
              href="/book-repair"
              className="inline-block mt-4 bg-blue-700 text-white font-body font-semibold px-5 py-2.5 rounded-lg text-sm"
            >
              Book a repair
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {repairs.map((r) => (
              <div key={r.id} className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <Wrench className="h-5 w-5 text-blue-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-mono text-xs text-sky-600">{r.ticketNumber}</p>
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full font-semibold ${STATUS_COLORS[r.status] ?? "bg-slate-100 text-slate-600"}`}>
                      {r.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="font-body font-semibold text-sm text-slate-900 mt-0.5">
                    {r.deviceType}{r.brandModel ? ` — ${r.brandModel}` : ""}
                  </p>
                  <p className="font-body text-xs text-slate-400 mt-0.5 line-clamp-1">{r.problemDescription}</p>
                </div>
                <Link
                  href={`/track-order?ticket=${r.ticketNumber}`}
                  className="shrink-0 text-slate-400 hover:text-blue-700 transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
